const controller = require('../controllers/users.controller')

module.exports = function(app) {
    app.use(function(req, res, next) {

      res.setHeader('Access-Control-Allow-Origin','https://5fef01a149113d7aca4b75cc--taskpro.netlify.app');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
    });
  


    app.post("/tp/api/login/google",
    controller.saveUserData
    )

  
   
};
  