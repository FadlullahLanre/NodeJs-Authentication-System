const db = require("../model");
const ROLES = db.ROLES;
const User = db.user;


checkDuplicateUsernameOrEmail = (req, res, next) =>{
    // check if Username exist in the db.
    User.findOne({
        username : req.body.username
    })
    .exec((err, user) => {
        if (err){
            res.status(500).send({message: err});
            return;
        }
        if (user){
            res.status(400).send({message : "Error, Username is already in use!"});
            return;
        }
    });
    

    // Check if Email exist in the db.
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err){
            res.status(500).send({message : err});
        }
        if (user){
            res.status(400).send({message : "Failed!, there is a user with this email"});
            return;
        }
        next();
    });


};

// check if the role the user choose exists in the db.
checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        // loop through the roles array
        for (let i = 0; i< req.body.roles.length; i++){
            // if role specified is not in the roles array
            if (!ROLES.includes(req.body.roles[i])){
                res.status(400).send({message: `Failed! Role ${req.body.roles[i]} does not exist!`});
                return;
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp;