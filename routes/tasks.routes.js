const controller = require('../controllers/tasks.controller')

module.exports = function(app) {
    app.use(function(req, res, next) {

      res.setHeader('Access-Control-Allow-Origin','https://5fe2cb1b6bbf67a30dfd2833--taskpro.netlify.app');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      
      next();
    });
  
    //app.get("/api/test/all", controller.allAccess);
  
    app.post("/tp/api/task/add",
      controller.create
    );

    app.post("/tp/api/tasks/all",
        controller.findAll
    )

    app.get('/tp/api/task/:id',
      controller.findOne
    )

    app.put('/tp/api/task/:id',
      controller.update
    )

    app.post("/tp/api/task/delete/:id",
      controller.softDelete
    )

    app.post("/tp/api/task/deleted",
    controller.getDeletedTasks
  )

    app.delete("/tp/api/task/:id",
      controller.delete
    )

    // get all Categories 
    // not using this endpoint
    app.get("/tp/api/task/category",
      controller.getAllCategories
    )

    app.post("/tp/api/task/category",
    controller.getCategoryWise
    )

  app.post("/tp/api/task/status",
    controller.getStatusWise
  )

  app.post("/tp/api/task/total/count",
    controller.getTotalStatusWise
  )


  
   
};
  