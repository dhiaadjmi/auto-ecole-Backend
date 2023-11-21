const mongoose = require("mongoose");
const Joi = require("joi");
require("dotenv").config();

let schemaSeance = mongoose.Schema({
  dateSeance: String,
  duree:String,
  type: ["code", "conduite"],
  user: ["candidat","moniteur"]
});

var Seance = mongoose.model("seance", schemaSeance);

url =process.env.URL

exports.testConnect = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        mongoose.disconnect();
        resolve("connected ");
      })
      .catch((err) => reject(err));
  });
};




exports.addNewSeance = (dateSeance,duree, type, user) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {

          let seance = new Seance({
            dateSeance: dateSeance,
            duree:duree,
            type: type,
            user: user

          });
          seance.save()
            .then((doc) => {
              mongoose.disconnect();
              resolve(doc);
            })
            .catch((err) => {
              mongoose.disconnect();
              reject(err);
            });
        })
        .catch((err) => reject(err));
    });
  };


  exports.getAllSeances = () => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          return Seance.find();
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

  exports.getOneSeance = (id) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          return Seance.findById(id);
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
  }

  exports.deleteOneSeance = (id) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          return Seance.deleteOne({_id:id});
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
  }



  exports.updateOneSeance =(id,dateSeance,duree,type,user)=>{
    return new Promise((resolve, reject) => {
      mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          return Seance.updateOne ({_id:id},{dateSeance:dateSeance,duree:duree,type:type,user:user});
        })
        .then((doc) => {
          mongoose.disconnect()
          resolve(doc);
        })
        .catch((err) => {
          mongoose.disconnect()
          reject(err) 
        });
    });
  }