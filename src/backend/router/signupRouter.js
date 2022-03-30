const express = require("express");
const Joi = require("joi");
const router = express.Router();
const bcrypt = require("bcrypt");
const Login = require("../models/identificationModel");

const newUserEntry = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })
      .max(100)
      .required(),
    password: Joi.string()
      .min(8)
      .required()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    firstName: Joi.string().max(50).required(),
    surName: Joi.string().max(50).required(),
    birthDate: {
      day: Joi.number().min(1).max(31).required(),
      month: Joi.number().required().min(1).max(12),
      year: Joi.number().min(1930).max(2022).required(),
    },
  });
  
  function validateNewEntry(req, res, next) {
    const validation = newUserEntry.validate(req.body);
  
    if (validation.error) {
      return res.status(400).json({
        message: "Error 400",
        description: validation.error.details[0].message,
      });
    }
  
    next();
  }

router.post("/register", newUserEntry, async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  try {
    await User.create({
      email: req.body.email,
      password: hashedPassword,
      firstname: req.body.firstname,
      surname: req.body.surname,
      date_of_birth: req.body.date_of_birth,
    });
    res.status(201).json({
        message: `User with the email adress "${req.body.email}" created`
    })
  } catch (err) {
    return res.status(400).json({
      message: "email adress unavailable, pick a new one",
    });
  }
});

module.exports = router;