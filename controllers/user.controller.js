// Controller for testing authorization..

// It contains four functions:

//    /api/test/all for public access
//    /api/test/user for loggedin users (any role)
//    /api/test/mod for manager users
//    /api/test/admin for admin users


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  exports.userDashBoard = (req, res) => {
    res.status(200).send("User DashBoard.");
  };
  exports.adminDashBoard = (req, res) => {
    res.status(200).send("Admin DashBoard.");
  };
  exports.managerDashBoard = (req, res) => {
    res.status(200).send("Manager DashBoard.");
  };