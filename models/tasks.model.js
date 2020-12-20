module.exports = (sequelize,Sequelize) => {

    const Tasks = sequelize.define("tasks",{
            title:{

                type: Sequelize.STRING

            },
            description:{
                type: Sequelize.TEXT,
            },
            category:{
                type:Sequelize.STRING,
            },
            status:{
                type:Sequelize.STRING,
            },
            deleted:{
                type:Sequelize.BOOLEAN

            }
    })
    return Tasks
}
