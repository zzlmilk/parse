'use strict';
var sequelize = require('../config/db').sequelize;
var Sequelize = require('../config/db').Sequelize;


var Education = sequelize.define('resume_educations', {
         id : {type : Sequelize.INTEGER,autoIncrement : true, primaryKey : true, unique : true },
         resume_id:{type : Sequelize.INTEGER},
         school:{type : Sequelize.INTEGER},
         major:{type : Sequelize.INTEGER},
         degree_level:{type : Sequelize.INTEGER},
         begin_times:{type : Sequelize.INTEGER},
         end_times:{type : Sequelize.INTEGER},
         not_ended:{type : Sequelize.INTEGER},		 
      },

     {freezeTableName:true,timestamps:false})



exports.education = Education;





// Education.findById(10).then(function(resume) {
//   //bs.cname = 'jane' 
//   if (!resume) {return}; 

//   console.log(resume.dataValues) // 'jane'
// })