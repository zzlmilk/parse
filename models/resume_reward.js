'use strict';
var sequelize = require('../config/db').sequelize;
var Sequelize = require('../config/db').Sequelize;


var Reward = sequelize.define('resume_reward', {
         id : {type : Sequelize.INTEGER,autoIncrement : true, primaryKey : true, unique : true },
         resume_id:{type : Sequelize.INTEGER},
         employer_account_id:{type : Sequelize.INTEGER},
         increase:{type : Sequelize.INTEGER},
         type:{type : Sequelize.INTEGER},
         expiration_time:{type : Sequelize.INTEGER},            
      },


     {freezeTableName:true,timestamps:false})


exports.reward = Reward;





// Education.findById(10).then(function(resume) {
//   //bs.cname = 'jane' 
//   if (!resume) {return}; 

//   console.log(resume.dataValues) // 'jane'
// })