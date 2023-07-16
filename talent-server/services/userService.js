import { User } from "../db/index.js";
import console_logger from "../middlewares/console_logger.js";

class userHandle {
  static async addUser({ name, id }) {
    if (!name)
      console_logger(
        "Service Error",
        "UserService : no name for addUser method",
        true
      );
    // Skipped user validating
    const NEW_USER = {
      name,
      id,
    };
    const CREATED_USER = await User.create({ USER: NEW_USER });
    console_logger("Service Info", "UserService : user created", false);
    console.log(CREATED_USER);

    return true;
  }

  static async getUserName({ id }) {
    if (!id) {
      console_logger(
        "Service Error",
        "UserService : no id for getUser method",
        true
      );
    }

    const USER = await User.findById({ id });

    if (!USER) console_logger("Service Error", "There is no such user", true);

    console.log(USER?.name);

    return USER?.name;
  }

  static async getUserId({ name }) {
    if (!name)
      console_logger("Service Error", "No name for getUserId method", true);

    const USER = await User.findByName({ name });

    if (!USER)
      console_logger("Service Error", "There is no such named user", true);

    console.log(USER?.id);
    return USER?.id;
  }

  static async getTalentAccount({ id }) {
    if (!id)
      console_logger(
        "Service Error",
        "UserService : no id for getTalentAccount method",
        true
      );

    const USER = await User.findById({ id });

    if (!USER)
      console_logger("Service Error", "There is no such named user", true);

    console.log(USER?.id);
    return USER?.id;
  }

  static async updateTalent({ id, updateAmount }) {
    // updateAmount can be positive, or the negative

    if (!id) {
      console_logger(
        "Service Error",
        "UserService : no id for getUser method",
        true
      );
    }
    const USER = await User.updateTalent({ id, updateAmount });

    if (!USER)
      console_logger("Service Error", "There is no such named user", true);

    console.log(USER?.id);
    return true;
  }
}

export { userHandle };
