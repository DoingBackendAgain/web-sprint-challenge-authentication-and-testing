const jwt = require("jsonwebtoken")


function restrict(){
   return async (req, res, next) => {

    try{

      const token = req.cookies.token

      if(!token){
        return res.status(401).json({
          message: "Token required"
        })
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=> {
        if(err){
          return res.status(401).json({
            message: "Token Invalid"
          })
        }

        req.token = decoded 

        next()
      })


    }
    catch(err){
      
    }
  
   }
}

module.exports = {
  restrict
}


/*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */