const db = require('../models')
const Tasks = db.tasks
const Op = db.Sequelize.Op

// create and save
exports.create = (req,res) =>{

     // console.log(token)
    // validate request
    if(!req.body.title){

        res.status(400).send({

                messege : 'Content cannot be empty!'    
        })
        return;
    }

    // create tutorial
    const task = {

        title: req.body.title,
        description:req.body.description,
        category:req.body.category,
        status:req.body.status,
        deleted:req.body.deleted,
        user_id: req.body.user_id
    }

    // save tutorial 
    Tasks.create(task)
    .then(data => {

        res.send(data)

    })
    .catch(err => {

        res.status(500).send({

                messege:
                    err.messege || "Some error occured while creating the Task"
        })

    })



}

exports.findAll = (req,res) =>{

  let user_id = req.body.user_id;

    Tasks.findAll({ where : { user_id : user_id }})
    .then(data => {

        res.send(data)

    })
    .catch(err =>{

        res.send(500).send({

                messege: 
                err.messege || "Some error occured"
        })

    })


}

exports.findOne = (req,res) =>{

    const id = req.params.id


    Tasks.findByPk(id)
    .then(data =>{

        res.send(data)


    })
    .catch(err =>{

        res.status(500).send({

            messege:
            err.messege || `Cannot Find Task with given id ${id}`

        })


    })

}

exports.update = (req,res) =>{

const id = req.params.id;

Tasks.update(req.body,{

    where : { id : id }

})
.then(num =>{

    if(num == 1 ){

        res.send({

            messege: 'Task was Updated Succesfully '

        })

    }

})
.catch(err =>{

    res.status(500).send({

        err:
        err.messege || 'Some Error Occured '

    })


})


}

exports.delete = (req,res) =>{

    const id = req.params.id

    Tasks.destroy({

        where : { id : id }
    })
    .then(num =>{
        if(num ==1 ){
            res.send({

                    messege:'Task was succesfully deleted'
            })
        }
        else {


            res.send({

                messege: `Cannot delete Task with id=${id}`
            })

        }
        

    })
    .then(err =>{

        res.status(500).send({

            messege:
            err.messege || `Cannot Delete Task with id=${id}`

        })


    })

}

exports.softDelete = (req,res)=>{

    const id = req.params.id
    Tasks.update(req.body,{

        where : { id : id }
    
    })
    .then(num =>{
    
        if(num == 1 ){
    
            res.send({
    
                messege: 'Task was Soft Deleted Succesfully '
    
            })
    
        }
    
    })
    .catch(err =>{
    
        res.status(500).send({
    
            err:
            err.messege || 'Some Error Occured '
    
        })
    
    
    })
}

exports.getDeletedTasks = async(req,res)=>{

    const user_id = req.body.user_id
    const deleted = req.body.deleted
    console.log(deleted)

    await Tasks.findAll({
        raw: true,
        where: {
            user_id : user_id,
            deleted: deleted
            }
    }).then(data=>{
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
        res.send('Some Error Occured')
    })
}

exports.getCategoryWise = async(req,res) =>{
    
    let user_id = req.body.user_id;
    let category = req.body.category;

    await Tasks.findAll({
        raw: true,
        where: {
            user_id : user_id,
            category: category
            }
    }).then(data=>{
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
        res.send('Some Error Occured')
    })


}

exports.getStatusWise = async(req,res) =>{
    
    let user_id = req.body.user_id;
    let status = req.body.status;

    await Tasks.findAll({
        raw: true,
        where: {
            user_id : user_id,
            status: status
            }
    }).then(data=>{
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
        res.send('Some Error Occured')
    })


}

exports.getAllCategories = async(req,res) =>{
    
    let user_id = req.body.id;
    let category = req.body.category
    await Tasks.findAll({
        attributes: ['id','category'],
        raw: true,
        where: {
            user_id : user_id,
            }
    }).then(data=>{
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
        res.send('Some Error Occured')
    })


}

exports.getTotalStatusWise = async(req,res) =>{

    const user_id = req.body.user_id
    const status = req.body.status
    
    await Tasks.findAndCountAll({ 
        raw:true,
        where: { 
            user_id : user_id,
            status: status
        }
    }).then(result => {

        res.send(result)

    })
    .catch(err =>{
    
        res.sendStatus(500).send({
    
            err:
            err.messege || 'Some Error Occured '
    
        })
    
    
    })

}