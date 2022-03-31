const express = require('express');
const app = express();
const port = 8011;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Register = require("./models/registerModel")
const Contact = require("./models/contactModel")
const {Random} = "./random.js" 
// const Login = require("./models/loginModel")

const Joi = require("joi");
// const router = express.Router();
const bcrypt = require("bcrypt");
require('dotenv').config({ path: "../../.env"})
app.use(express.json());
app.use(cookieParser());

mongoose
.connect(
       process.env.MONGO_URI,
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
        const validation = newRegistrationEntry.validate(req.body);
  
    if (validation.error) {
      return res.status(400).json({
        message: "Error 400",
        description: validation.error.details[0].message,
      });
    }
    next();
}

app.post("/register",validateNewRegisterEntry, validateNewContactEntry, async (req, res) => {
          const hashedPassword = await bcrypt.hash(req.body.password, 12);
  try {
     regisId = await Register.create({
      email: req.body.email,
      password: hashedPassword,
    })
    console.log(regisId)
    ;
    res.status(201).json({
        message: `User with the email adress "${req.body.email}" created`
    })
  } catch (err) {
    return res.status(400).json({
      message: "email adress unavailable, pick a new one",
    });
  }
//   try{
//     await Contact.create({
//         name: req.body.contact.name,
//         email: req.body.contact.email,
//         description: req.body.contact.description,
//         category: req.body.contact.category,
//         registerId: req.body.register._id
//       });
//       res.status(201).json({
//           message: `Contact ${req.body.register.name} has been created`
//       })
//   }
//   catch(err) {
//     return res.status(400).json({
//         message: "email adress unavailable, pick a new one",
//   })}
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	// 1 - Vérifier si le compte associé à l'email existe
	const register = await Register.findOne({ email });

	if (!register) {
		return res.status(400).json({
			message: "Invalid email or password",
		});
	}

	// 2 - Comparer le mot de passe au hash qui est dans la DB
	const isPasswordValid = await bcrypt.compare(password, register.password);
    
    console.log(process.env.CLE)
	if (!isPasswordValid) {
		return res.status(400).json({
			message: "Invalid email or password",
		});
	}

	// 3 - Générer un token
	const token = jwt.sign({ id: register._id }, process.env.CLE);

	// 4 - On met le token dans un cookie
	res.cookie("jwt", token, { httpOnly: true, secure: false });

	// 5 - Envoyer le cookie au client
	res.json({
		message: "Here is your cookie",
	});
});

app.get("/auth", (req, res) => {
	// 1 - Vérifier le token qui est dans le cookie
	let data;
    isLogged=false
	try {
		data = jwt.verify(req.cookies.jwt, process.env.CLE);
        console.log(data)
	} catch (err) {
		return res.status(401).json({
			message: "Your token is not valid",
		});
	}

	// L'utilisateur est authentifié/autorisé
	res.json({
		message: "Votre requête a été acceptée",
		data, isLogged: true
	});
});

// DELETE - Log Out
app.delete("/auth", (req, res) => {
    
        res.clearCookie("jwt");
        res.end()
})

app.get("*", (req, res) => {
    res.status(404).send("Did not found the info");
  });

 app.listen(port, () => {
    console.log('Server started on port: ' + port);
  });

//   "contact":
// {
//     "name":"Hinata Uzumaki",
//     "email":"hinatauzumaki@konoha.com",
//     "description":"wife",
//     "category":"0",
//     "registerId":""
// }