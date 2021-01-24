const router = require('express').Router();
const model = require("./auth-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post('/register', async (req, res, next) => {
  try{
    const {username, password} = req.body
    const user = await model.findByUsername({username})
  
    console.log(username)

    if(user){
      return res.status(409).json({
        message: "username taken"
      })
    }

    if(!req.body.username || !req.body.password){
      return res.status(409).json({
        message: "username and password required"
      })
    
    }

    const newUser = await model.add({
      username,
      password: await bcrypt.hash(password, 10)
    })

    res.status(201).json(newUser)


  }
  catch(err){
    next(err)
  }

});
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */


router.post('/login', (req, res, next) => {
  try{
    const {username, password} = req.body
    const current = await model.findByUsername({username})
    console.log(username)

    if(!req.body.username || !req.body.password){
      return res.status(401).json({
        message: "username and password required "
      })
    }
    if(!current){
      return res.status(401).json({
        message: "invalid credentials"
      })
    }

    const passwordValid = await bcrypt.compareSync(password, current.password)

    if(!passwordValid) {
      return res.status(401).json({
        message: "Password incorrect"
      })
    }

    const token = jwt.sign({
      userId: current.id,
    },process.env.JWT_SECRET )

  }
  catch(err){
    next(err)
  }
 
});

 /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */

module.exports = router;
