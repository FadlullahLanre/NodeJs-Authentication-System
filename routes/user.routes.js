// Authorization routes

// GET /api/test/all
// GET /api/test/user for loggedin users (user/manager/admin)
// GET /api/test/man for manager
// GET /api/test/admin for admin


const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Get contents for public
  app.get("/api/test/all", controller.allAccess);
  // Get contents for all users
  app.get("/api/test/user", [authJwt.verifyToken], controller.userDashBoard);
  // Get contents for managers 
  app.get(
    "/api/test/man",
    [authJwt.verifyToken, authJwt.isManager],
    controller.managerDashBoard
  );
  // Get contents for admin
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminDashBoard
  );
};