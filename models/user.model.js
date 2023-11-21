const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
require("dotenv").config();
/** 
const schemaValidation = Joi.object({
  username: Joi.string().alphanum().min(2).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string()
    .minOfSpecialCharacters(3)
    .minOfLowercase(4)
    .minOfUppercase(5)
    .minOfNumeric(6)
    .noWhiteSpaces()
    .messages({
      "password.minOfUppercase":
        "{#label} should contain at least {#min} uppercase character",
      "password.minOfSpecialCharacters":
        "{#label} should contain at least {#min} special character",
      "password.minOfLowercase":
        "{#label} should contain at least {#min} lowercase character",
      "password.minOfNumeric":
        "{#label} should contain at least {#min} numeric character",
      "password.noWhiteSpaces": "{#label} should not contain white spaces",
    }),

 
});
*/
let schemaUser = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  nom: String,
  prenom: String,
  dateNaissance: String,
  adresse: String,
  numeroTel: String,
  numeroCin: Number,
  typeMoniteur: String,
  numPermi: Number,
  numDiplome: Number,
  typePermi: String,
  role: ["secretaire", "administrateur", "candidat", "moniteur"],
});

url = process.env.URL;

//url="mongodb+srv://dhiaadjmi:dhiaadjmi@cluster0.7id0ldf.mongodb.net/?retryWrites=true&w=majority"
var User = mongoose.model("user", schemaUser);

exports.register = (
  username,
  email,
  password,
  nom,
  prenom,
  dateNaissance,
  adresse,
  numeroTel,
  numeroCin,
  typeMoniteur,
  numPermi,
  numDiplome,
  typePermi,
  role
) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((doc) => {
        if (doc) {
          mongoose.disconnect();
          reject("this email is exist");
        } else {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              let user = new User({
                username: username,
                email: email,
                password: hashedPassword,
                nom: nom,
                prenom: prenom,
                dateNaissance: dateNaissance,
                adresse: adresse,
                numeroTel: numeroTel,
                numeroCin: numeroCin,
                typeMoniteur: typeMoniteur,
                numPermi: numPermi,
                numDiplome: numDiplome,
                typePermi: typePermi,
                role: role,
              });
              user
                .save()
                .then((user) => {
                  mongoose.disconnect();
                  resolve(user);
                })
                .catch((err) => {
                  mongoose.disconnect();
                  reject(err);
                });
            })
            .catch((err) => {
              mongoose.disconnect();
              reject(err);
            });
        }
      });
  });
};
//var privatekey = "this is my secret key diehdijdojaiddienddizdzdnzd"

var privatekey = process.env.PRIVATE_KEY;

exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (!user) {
          mongoose.disconnect();
          reject("we don't have this email in our database");
        } else {
          bcrypt
            .compare(password, user.password)
            .then((same) => {
              if (same) {
                let token = jwt.sign(
                  { id: user._id, username: user.username },
                  privatekey,
                  { expiresIn: "1h" }
                );
                mongoose.disconnect();
                resolve({token,role:user.role});
              } else {
                mongoose.disconnect();
                reject("invalid passwrod");
              }
            })
            .catch((err) => {
              mongoose.disconnect();
              reject(err);
            });
        }
      });
  });
};

exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return User.find();
      })
      .then((doc) => {
        mongoose.disconnect();
        resolve(doc);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.getOneUser = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return User.findById(id);
      })
      .then((doc) => {
        mongoose.disconnect();
        resolve(doc);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.deleteOneUser = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return User.deleteOne({ _id: id });
      })
      .then((doc) => {
        mongoose.disconnect();
        resolve(doc);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.updateOneUser = (
  id,
  username,
  email,
  password,
  nom,
  prenom,
  dateNaissance,
  adresse,
  numeroTel,
  numeroCin,
  typeMoniteur,
  numPermi,
  numDiplome,
  typePermi
) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return User.updateOne(
          { _id: id },
          {
            username: username,
            email: email,
            password: password,
            nom: nom,
            prenom: prenom,
            dateNaissance: dateNaissance,
            adresse: adresse,
            numeroTel: numeroTel,
            numeroCin: numeroCin,
            typeMoniteur: typeMoniteur,
            numPermi: numPermi,
            numDiplome: numDiplome,
            typePermi: typePermi,
          }
        );
      })
      .then((doc) => {
        mongoose.disconnect();
        resolve(doc);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};


 
module.exports.findOneUserDBService = (userDetais) => {
    return new Promise(function myFn(resolve, reject) {
        userModel.findOne({name:userDetais}, function returnData(error, result) {
          if(error)
          {
                reject(false);
          }
          else
          {
             resolve(result);
          }
        });
    });
}