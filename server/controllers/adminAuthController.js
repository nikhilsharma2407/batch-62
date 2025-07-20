const { errorCreator } = require("../utils/responseHandler");

const adminAuthController = async (req, res, next) => {
  try {
    const user = res.locals.user;
    if (!user.isAdmin) {
      errorCreator("You're not an admin!!!", 403);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminAuthController;
