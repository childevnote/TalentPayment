import { Router } from "express";
import { userHandle } from "../services/userService.js";
import console_logger from "../middlewares/console_logger.js";

const userRouter = Router();

userRouter.post("/user/create", async (req, res, next) => {
  try {
    const { name } = req.body;
    const NEW_USER = await userHandle.addUser({ name });

    res.status(201).send({ NEW_USER });
  } catch (err) {
    console_logger("Router Error", err.message, true);
    next(err);
  }
});

userRouter.post("/user/update", async (req, res, next) => {
  try {
    const { id, updateAmount } = req.body;
    if (!id)
      console_logger("Router Error", "There is no Id for user Router", true);

    const UPDATE_USER = await userHandle.updateTalent({
      id,
      updateAmount: updateAmount ?? 0,
    });

    if (!UPDATE_USER)
      res.status(503).send({ message: "internal server error" });

    res.status(201).send({ status: "succesfully updated", user: UPDATE_USER });
  } catch (err) {}
});

export { userRouter };
