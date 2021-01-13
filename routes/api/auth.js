const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('config');

//@route GET api/auth
//@desc Test route
//@Access public
router.get('/',auth,async(req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user);
    }catch(err){
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

router.post(
    "/",
    [
      check("email", "Valid email please").isEmail(),
      check("password", "Please enter a password").exists(),
    ],
    async (req, res) => {
      //This is called destructuring.
      const {email, password } = req.body; 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        //Check if the user exists.
        let user = await User.findOne({ email });
        //console.log(password+' ' + user);
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        
        
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch)
        {
            return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });   
        }
      
        const payload = {
          user:{
            id: user.id 
          }
        }
  
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {expiresIn:36000},
          (err,token) => {
            if(err) throw err
            res.json({token});
          }
          );
  
          //TOKEN CREATED NOW HANDLE THE VERIFICATION
  
        //res.send("User registered");
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    }
  );

module.exports = router;