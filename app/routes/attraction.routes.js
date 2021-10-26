module.exports = app => {
    const attractions = require("../controllers/attraction.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all attractions
    router.get("/", attractions.findAll);
  
    app.use('/api/attractions', router);
  };