// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  app.get('/', function( req, res ) {

    db.Burger.findAll({ })
             .then( function(data) {
                res.render('index', {burger: data} );
              }).catch( function(error){
                console.log(error);
              });
  });


  app.post('/', function( req, res ) {

    db.Burger.create({ burger_name: req.body.burger_name })
             .then( function() {
                res.redirect('/');
              }).catch( function(error){
                console.log(error);
              });
  });

  app.put('/:id', function( req, res ) {
    //I couldn't find a good way to parse strings to bools, and it wasn't updating correctly when I passed true as a string, so I had to do this hackery to get around that, instead of hardcoding in simply "devoured: true"
    let devoured = (req.body.devoured == "true")

    db.Burger.update( {devoured: devoured} , 
                      {where: 
                        {id: req.params.id}})
              .then( function(){
                res.redirect('/');
              });
  });

  app.delete('/:id', function( req, res ) {

    db.Burger.destroy({where: 
                        {id: req.params.id}})
              .then( function(){
                res.redirect('/');
              });
  });

};
