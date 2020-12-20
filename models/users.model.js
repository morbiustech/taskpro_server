module.exports = (sequelize, Sequelize) => {


    const users = sequelize.define("users", {
        user_id: {

            type: Sequelize.STRING,
            primaryKey:true,

        },
        name: {

            type: Sequelize.STRING

        },
        email: {

            type: Sequelize.STRING

        },
        provider_name: {

            type: Sequelize.STRING

        },
        image: {
            type: Sequelize.STRING
        }
    })
    return users;

}