const express = require("express");
const cors = require("cors");
const app = express();


const dbConfig = require("./config/db.config");
var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./model");
// creating Role context
const Role = db.role;
// connection to mongoDB database
db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to the Database");
    initial();
})
.catch(err => {
    console.error("Connection failed to the Database", err);
    process.exit();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to authentication application." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// creating the initial() function to create each role in the Roles collection.
// which is assigned after connection to the database successfully.

function initial(){
    Role.estimatedDocumentCount((err, count) => {
        if(!err && count ===0){
            new Role({
                name : "user"
            }).save(err => {
                if(err) {
                    console.log('error', err);
                }
                console.log("added 'user' to roles collection");
            });

            new Role ({
                name : "manager"
            }).save(err => {
                if(err){
                    console.log('error', err);
                }
                console.log(" added 'manager' to roles collection");
            });

            new Role({
                name: "admin"
            }).save (err => {
                if (err) {
                    console.log('error', err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}

