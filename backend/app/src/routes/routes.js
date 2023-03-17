module.exports = app => {
  const controller = require("../controller/index.js");
  const ValidationHeader = require("../validation/ValidationHeader")

  var router = require("express").Router();

  // Retrieve all controller
  router.post("/login", controller.login.login);
  router.post("/findall", ValidationHeader.Verify.verifyToken, controller.joblist.findAll);

  app.use('/api', router);
};