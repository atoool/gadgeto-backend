const { authJwt } = require("../middleware");
const {
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
} = require("../controller/user.controller");

module.exports = function (router) {
  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  router.get("/user/all", allAccess);
  router.get("/user", [authJwt.verifyToken], userBoard);
  router.get(
    "/user/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    moderatorBoard
  );
  router.get("/user/admin", [authJwt.verifyToken, authJwt.isAdmin], adminBoard);
};
