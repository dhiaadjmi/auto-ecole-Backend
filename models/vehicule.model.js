 const mongoose = require('mongoose')
require('dotenv').config()

let schemaVehicule = mongoose.Schema({
    matricule: String,
    marque: String,
    modele: String,
    numeroSerie: String,
    dateAssurance: String,
    dateFinAssurance: String,
    dateCtrlTechnique: String,
    dateProchainCtrlTechnique: String
    
  });


  var Vehicule = mongoose.model("vehicule", schemaVehicule);

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


  exports.addNewVehicule = (matricule, marque, modele, numeroSerie, dateAssurance,dateFinAssurance,dateCtrlTechnique,dateProchainCtrlTechnique) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {

          let vehicule = new Vehicule({
            matricule: matricule,
            marque: marque,
            modele: modele,
            numeroSerie: numeroSerie,
            dateAssurance: dateAssurance,
            dateFinAssurance:dateFinAssurance,
            dateCtrlTechnique:dateCtrlTechnique,
            dateProchainCtrlTechnique:dateProchainCtrlTechnique
          });
          vehicule.save()
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


  exports.getAllVehicules = () => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          return Vehicule.find();
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
  
  exports.getOneVehicule = (id) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          return Vehicule.findById(id);
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



  exports.deleteOneVehicule = (id) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          return Vehicule.deleteOne({_id:id});
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


  exports.updateOneVehicule =(id,matricule,marque,modele,numeroSerie,dateAssurance,dateFinAssurance,dateCtrlTechnique,dateProchainCtrlTechnique)=>{
    return new Promise((resolve, reject) => {
      mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          return Vehicule.updateOne ({_id:id},{matricule:matricule,marque:marque,modele:modele,numeroSerie:numeroSerie,dateAssurance:dateAssurance,dateFinAssurance:dateFinAssurance,dateCtrlTechnique:dateCtrlTechnique,dateProchainCtrlTechnique:dateProchainCtrlTechnique});
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
  
 