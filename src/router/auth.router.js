const { verifySignUp } = require("../middleware");
const controller = require("../controller/auth.controller");

module.exports = function (router) {
  router
    .route("/auth/signup")
    .post(
      [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted,
      ],
      controller.signup
    );
  router.route("/auth/signin").post(controller.signin);
};
