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

    db.Burger.findAll({ include: [db.Diner] })
             .then( function(data) {
                res.render('index', {burger: data} );
              }).catch( function(error){
                console.log(error);
              });
  });


  app.post('/', function( req, res ) {
    //if req.body.diner_name isn't passed, that's ok. just create the burger.
    if( !req.body.diner_name ){
       db.Burger.create({ burger_name: req.body.burger_name})
                         .then( function() {
                            res.redirect('/');
                          }).catch( function(error){
                            console.log(error);
                          });
    }
    else {
    //otherwise, look to see if diner exists already
      db.Diner.findOne({ where: {name: req.body.diner_name}})
              .then( function(result) {
                if ( result ) { //if it does, great, add the burger with that diner's id
                  db.Burger.create({ burger_name: req.body.burger_name, DinerId: result.id })
                           .then( function() {
                              res.redirect('/');
                            }).catch( function(error){
                              console.log(error);
                            });
                } else { //if it doesn't, add the diner to the diner table, then add the burger with the diner id
                  db.Diner.create({ name: req.body.diner_name })
                          .then( function( result ) {
                              db.Burger.create({ burger_name: req.body.burger_name, DinerId: result.id })
                                       .then( function() {
                                          res.redirect('/');
                                        }).catch( function(error){
                                          console.log(error);
                                        });
                          });
                }         
          });
      }

    
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
