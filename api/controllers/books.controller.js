'use strict';
const _ = require('lodash');
const util = require('util');	// Required in swagger sample controller
var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
//var shortid = require('shortid');


const { books } = require('../models');	// Sequelize

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////


// Module Name
const MODULE_NAME = '[gamesystem.controller]';

// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Gamesystem deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////
function getBooksbyId(req, res) {
  //console.log("operadores.controller getOperadorById");
  try {

    console.log(req.swagger.params.id.value);
    var id = req.swagger.params.id.value;
   
    console.log("books by id..." + id);
    //console.log(books);

    books.findByPk(id)
    .then(mybooks => {
    console.log(mybooks);
    res.status(200).send(mybooks);
   })

  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, getBooksbyId.name, error, res);
  }
}

function getBooks(req, res) {

  try {
        
   console.log("books...");
   console.log(books);
   books.findAll({
    /*include: [{
      model: orderstatus
     
    }]

    include: [{ all: true, nested: true }]*/
      })
   .then((consoles) => {
     console.log(consoles);
     res.status(200).send(consoles);
     //utils.writeJson(res, consoles);
   }, (error) => {
     res.status(500).send(error);
   });

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getBooks.name, error, res);
  }
}

function updateBooks(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  //console.log("operadores.controller getOperadorById");
  try {
    var id = req.swagger.params.id.value;
   
    console.log("params : " + id);
    var myupdatebooks = req.body;
    console.log("update books ... " + myupdatebooks.name + " " + myupdatebooks.descripcion);
 

    books.findByPk(id)
      .then(mybooks => {
        console.log("Result of findById: " + mybooks);
        if (!mybooks) {
          res.status(401).send(({}));
        
        }
        return mybooks
          .update({ 
            name: myupdatebooks.name, 
            author: myupdatebooks.author,
            editorial: myupdatebooks.editorial,
            year: myupdatebooks.year,
            pages: myupdatebooks.pages
            
           })
          .then(() => res.status(200).send(mybooks) )
          .catch(error => res.status(403).send(mybooks));
        })
      .catch(error => {
          console.log("There was an error: " + error);
          //resolve(error);
    });

  } catch (error) {
      console.log("Was an error");
      controllerHelper.handleErrorResponse(MODULE_NAME, updateBooks.name, error, res);
  }

}

function addBooks(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  try {

    console.log("params : ");
    var mybooks = req.body;
    console.log("books ... " + mybooks);
 
      return books
        .create({
          name: mybooks.name,
          author: mybooks.author,
          editorial: mybooks.editorial,
          year: mybooks.year,
          pages: mybooks.pages,
          createdAt: mybooks.createdAt,
          updatedAt: mybooks.updatedAt
          
           


        }, {
        /*  include: [{
            model: order_detail,
            as: 'orderdetail'
          }] */
        })
        .then((mybook) => {
          res.status(201).send(mybook);
              
        })
        .catch((error) => res.status(400).send(error));
    

  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, addBooks.name, error, res);
  }
}


function deleteBooks(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');
 
  console.log(req.swagger.params.id.value);
  var id = req.swagger.params.id.value;
 
  books.findByPk(id)
  //Books.findById(id)
    .then(mybooks => {
      console.log("Result of findById: " + mybooks);
      if (!mybooks) {
        res.status(200).send({"success": 0, "description":"not found !"});
      }
      else
      {
      return mybooks
        .destroy()
        .then(() => res.status(200).send({"success": 1, "description":"deleted!"}))
        .catch(error => res.status(403).send({"success": 0, "description":"error !"}))
      }
    })
    .catch(error => {
      console.log("There was an error: " + error);
    });


}

module.exports = {
  getBooksbyId,
  getBooks,
  updateBooks,
  addBooks,
  deleteBooks,
  GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
  GS_CT_DELETED_SUCCESSFULLY,
  MODULE_NAME
}