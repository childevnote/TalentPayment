import { Router } from "express";
import { userHandle } from "../services/userService.js";
import console_logger from "../middlewares/console_logger.js";

const userRouter = Router();

userRouter.post("/user/create", async (req, res, next) => {
  try {
    const { name, id } = req.body;
    const NEW_USER = await userHandle.addUser({ name, id });

    res.status(201).send({ NEW_USER });
  } catch (err) {
    console_logger("Router Error", err.message, true);
    next(err);
  }
});

userRouter.post("/user/read", async (req, res, next) => {
  try {
    const { id } = req.body;
    const USER_NAME = await userHandle.getUserName({ id });
    const USER_ACCOUNT = await userHandle.getTalentAccount({ id });

    if (!USER_NAME) {
      console_logger("Router Error", "no user name queried", true);
      res.status(503).send({ result: "query failed" });
    }

    if (!USER_ACCOUNT) {
      console_logger("Router Error", "no user talent account. why?", true);
      res.status(503).send({ result: "failed to get talent account" });
    }

    res.status(201).send({ username: USER_NAME, account: USER_ACCOUNT });
  } catch (err) {
    console_logger("Router Error", err.message, true);
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
