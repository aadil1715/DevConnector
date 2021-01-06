const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const User = require('../../models/Users');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

//@route GET api/users
//@desc Test route
//@Access public

//This is called destructuring.

router.post('/',
[
    check('name','Please enter a name').not().isEmpty(),
    check('email','Valid email please').isEmail(),
    check('password','Please enter a password with 6 char length').isLength({min:6})
],
async (req,res) => 
{
    const {name,email,password} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }

    try {
        //Check if the user exists.
        let user = await User.findOne({email});
        if(user)
        {
           return res.status(400).json({errors:[{msg:'User already exists'}]});
        }

        //Get avatar
        const avatar = gravatar.url({
            s:'200',
            r:'d',
            d:'mm'
        });

        //Create a user instance

        user = new User({
            name,
            email,
            password,
            avatar
        });

        //Hashing password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();

        res.send('User registered')

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
        
    }
    
}
);

module.exports = router;