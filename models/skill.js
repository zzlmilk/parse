'use strict';
var sequelize = require('../config/db').sequelize;
var Sequelize = require('../config/db').Sequelize;





var Language= sequelize.define('resume_language_skill', {
         id : {type : Sequelize.INTEGER,autoIncrement : true, primaryKey : true, unique : true },
         resume_id:{type : Sequelize.INTEGER},
         language_name:{type : Sequelize.STRING},
         language_degree_name:{type : Sequelize.STRING},        		 
      },
    
     {freezeTableName:true,timestamps:false})



var Skill= sequelize.define('resume_skill', {
         id : {type : Sequelize.INTEGER,autoIncrement : true, primaryKey : true, unique : true },
         resume_id:{type : Sequelize.INTEGER},
         skill_name:{type : Sequelize.STRING},
         skill_master:{type : Sequelize.STRING},
         skill_time:{type : Sequelize.STRING},        		 
      },
     {freezeTableName:true,timestamps:false})





exports.language = Language;
exports.skill = Skill;


