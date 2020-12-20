const db = require('../models')
const user =  db.users
const Op = db.Sequelize.Op
const sendWelcomeMail  = require('../emails/welcome')

exports.saveUserData = (req,res) =>{

    const id = req.body.user_id
    if(!req.body.name){
        res.status(400).send({
                messege : 'Content cannot be empty!'    
        })
        return;
    }

    const user_data = {

        user_id:req.body.user_id,
        name:req.body.name,
        email: req.body.email,
        image:req.body.image,
        provider_name: req.body.providerId,
    
    }
console.log(user_data)


function isIdUnique(id) {
    return user.count({ where: { user_id: id } })
      .then(count => {
        if (count != 0) {
          return false;
        }
        return true;
    });
}

isIdUnique(id).then(isUnique => {
    if (isUnique) {
        console.log('yes id is unique')
        user.create(user_data)
        
        .then(data => {

            res.send(data)
            const name = user_data.name
            const email = user_data.email
            const subject = 'Welcome to Morbius Messenger Pro'
            const text = 'Send messeges to your friends'
            sendWelcomeMail(name,email, subject, text, function(err, data) {
                if (err) {
                    console.log('ERROR: ', err);
                    return res.status(500).json({ message: err.message || 'Internal Error' });
                }
                console.log('Email sent!!!');
                return res.json({ message: 'Email sent!!!!!' });
            });

        })
        .catch(err => {

            res.status(500).send({

                    messege:
                        err.messege || "Some error occured while creating the data!"
            })

        })

    }
    else{

      //  res.send({messege: "ID already Exists!"})
        user.findByPk(id)
        .then(data =>{
    
            res.send(data)
            const name = user_data.name
            const email = user_data.email
            const subject = 'Welcome to Task.Pro'
            const text = 'Send Tasks and messeges to your friends'
            sendWelcomeMail(name,email, subject, text, function(err, data) {
                if (err) {
                    console.log('ERROR: ', err);
                    return res.status(500).json({ message: err.message || 'Internal Error' });
                }
                console.log('Email sent!!!');
                return res.json({ message: 'Email sent!!!!!' });
            });
    
    
        })
        .catch(err =>{
    
            res.status(500).send({
    
                messege:
                err.messege || `Cannot Find todo with given id ${id}`
    
            })
    
    
        })
    }
});
  
}




  