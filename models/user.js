'use strict';
var sequelize_employer = require('../config/db').sequelize_employer;
var Sequelize = require('../config/db').Sequelize;


var Employer= sequelize_employer.define('employer_account', {
         id : {type : Sequelize.INTEGER,autoIncrement : true, primaryKey : true, unique : true },
         email:{type : Sequelize.INTEGER},
         //password:{type : Sequelize.STRING},
         phone:{type : Sequelize.INTEGER},
         nickname:{type : Sequelize.INTEGER},
         icon_type	:{type : Sequelize.INTEGER},  
         //login_time	:{type:Sequelize.INTEGER},     		 
      },
     {freezeTableName:true,timestamps:false} )



// Employer.findById(70).then(function(employer){
// 		console.log(employer);
// });


exports.employer = Employer;

