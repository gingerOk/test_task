const express = require('express');
const fs = require('fs');
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

const router = express.Router();
const usersdb = JSON.parse(fs.readFileSync('../users.json', 'UTF-8'));

const SECRET_KEY = '123456789'
const expiresIn = '1h'

// Check if the user exists in database
function isAuthenticated(db, email, password){
    return db.users.findIndex(user => user.email === email && user.password === password) !== -1;
  }
  
// Create a token from a payload 
function createToken(payload){
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
  }
  
  // Verify the token 
  function verifyToken(token){
    return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
  }

//Fetch users from 
router.get('/api/users', (req, res) => {
    console.log("users endpoint called; request body:");
    fs.readFile("src/server/users.json", (err, data) => { 
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({status, message})
        return
      };
  })
      const users = usersdb.users;
      res.status(200).json(users)
  })

router.post('/api/register', (req, res) => {
    console.log("register endpoint called; request body:");
    console.log(req.body);
    const {email, password, name} = req.body;

    if(isAuthenticated(usersdb, email, password) === true) {
        const status = 401;
        const message = 'Email and Password already exist';
        res.status(status).json({status, message});
        return
      }
    
    fs.readFile("src/server/users.json", (err, data) => {  
        if (err) {
          const status = 401
          const message = err
          res.status(status).json({status, message})
          return
        };
    
        // Get current users data
        var newData = JSON.parse(data.toString());
    
        // Get the id of last user
        var last_item_id = newData.users.length > 1 ? newData.users[newData.users.length-1].id : 0;
        //Add new user
        newData.users.push({name, email, password, id: last_item_id + 1}); //add some data
        fs.writeFile("src/_services/users.json", JSON.stringify(newData), (err, res) => {  // WRITE
            if (err) {
              const status = 401
              const message = err
              res.status(status).json({status, message})
              return
            }
        });
    });
    
    // Create token for new user
    const access_token = createToken({email, password})
    console.log("Access Token:" + access_token);
    res.status(200).json({access_token})
})

// Login to one of the users from ./users.json
router.post('/api/login', (req, res) => {
    console.log("login endpoint called; request body:");
    console.log(req.body);
    const contents = fs.readFileSync("src/_services/users.json", 'utf8');
    const newData = JSON.parse(contents)
    if (!isAuthenticated(newData, req.body.email, req.body.password)) {
      const status = 401
      const message = 'Incorrect email or password'
      res.status(status).json({status, message})
      return
    } 
    const currentUser = newData.users.filter(user => req.body.email === user.email && req.body.password === user.password);
    const [{email, password}] = currentUser;
    const access_token = createToken({email, password})
    console.log("Access Token:" + access_token);
    res.status(200).json({access_token})
  })

  app.use(/^(?!\/auth).*$/,  (req, res, next) => {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
      const status = 401
      const message = 'Bad authorization header'
      res.status(status).json({status, message})
      return
    }
    try {
       verifyToken(req.headers.authorization.split(' ')[1])
       next()
    } catch (err) {
      const status = 401
      const message = 'Error: access_token is not valid'
      res.status(status).json({status, message})
    }
})


app.use(router);

app.listen(process.env.PORT || 8080, () => {
    console.log('Run Auth API Server')
});