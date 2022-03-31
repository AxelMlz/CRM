const express = require('express');
const app = express();
const port = 8011;
const mongoose = require("mongoose");
const Register = require("./models/registerModel")
const Contact = require("./models/contactModel")
// const Login = require("./models/loginModel")

const Joi = require("joi");
// const router = express.Router();
const bcrypt = require("bcrypt");
require('dotenv').config({ path: "./.env"})
const  {REACT_APP_THAT} = process.env
app.use(express.json());

mongoose
.connect(
        `mongodb+srv://axel_mlz:@database-backend.4wob9.mongodb.net/crm?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
        }
    )
    .then(() => console.log("Connected to MongoDB"));

    
const newContactEntry = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })
      .max(100).required(),
      name: Joi.string().max(60).required(),
      description:Joi.string().max(300),
      category:Joi.number().required(),
    });
    
    function validateNewContactEntry(req, res, next) {
        const validation = newContactEntry.validate(req.body.contact);
  
    if (validation.error) {
      return res.status(400).json({
        message: "Error 400",
        description: validation.error.details[0].message,
      });
    }
  
    next();
    }

const newRegistrationEntry = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })
      .max(100)
      .required(),
      password: Joi.string()
      .min(6)
      .required()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)
    });
    
    function validateNewRegisterEntry(req, res, next) {
        const validation = newRegistrationEntry.validate(req.body.register);
  
    if (validation.error) {
      return res.status(400).json({
        message: "Error 400",
        description: validation.error.details[0].message,
      });
    }
    next();
}

app.post("/register",validateNewRegisterEntry, validateNewContactEntry, async (req, res) => {
          const hashedPassword = await bcrypt.hash(req.body.register.password, 12);
  try {
    await Register.create({
      email: req.body.register.email,
      password: hashedPassword,
    })
    ;
    res.status(201).json({
        message: `User with the email adress "${req.body.register.email}" created`
    })
  } catch (err) {
    return res.status(400).json({
      message: "email adress unavailable, pick a new one",
    });
  }
  try{
    await Contact.create({
        name: req.body.contact.name,
        email: req.body.contact.email,
        description: req.body.contact.description,
        category: req.body.contact.category,
        registerId: req.body.register._id
      });
      res.status(201).json({
          message: `Contact ${req.body.register.name} has been created`
      })
  }
  catch(err) {

  }
});

app.get("/", (req, res) => {

  const dataB= REACT_APP_THAT 
    console.log(dataB)
})


// Middleware activated by every request
function debug( req, res, next){
    console.log("requête reçue");
    next()
}

// GET - Display the list of Users

// app.get ("/register", debug, async (req,res)=> {
// 	try { 
// 		let signup= await Register.create(req.body);
// 		res.send("User added");
//     }catch(err){
//             console.log(err)
//             return res.send("error")
//         }
// })

app.post ("/register", debug, async (req,res)=> {
	try { 
		let signup= await Register.find();
		res.send("User added");
    }catch(err){
            console.log(err)
            return res.send("error")
        }
})

 app.get("/student/:Id", async (req, res) => {
	 const student = await Register.findById(req.params.Id).populate("contact");
	 
	 res.json(student);
	});
	
	// Sign Up
// app.post("/signup", async (req, res) => {
// 	try{
// 		 await Adress.create(req.body);
// 	}
// 	catch(err){
// 		console.log(err)
// 		return res.send("error")
// 	}
// 	res.status(201).send("user created");
// });

app.get("*", (req, res) => {
    res.status(404).send("Did not found the info");
  });

 app.listen(port, () => {
    console.log('Server started on port: ' + port);
  });