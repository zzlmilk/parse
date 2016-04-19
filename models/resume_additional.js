	'use strict';
var sequelize = require('../config/db').sequelize;
var Sequelize = require('../config/db').Sequelize;


var Resume_additional= sequelize.define('resume_additional', {
         id : {type : Sequelize.INTEGER,autoIncrement : true, primaryKey : true, unique : true },
         resume_id:{type : Sequelize.INTEGER},
         doc_name:{type : Sequelize.STRING},
         upload_user_id:{type : Sequelize.INTEGER},
         file_type:{type : Sequelize.INTEGER},
         complete_score:{type : Sequelize.INTEGER},  
         create_time:{type:Sequelize.INTEGER},     		 
      },
      
     {freezeTableName:true,timestamps:false})

	'use strict';
var sequelize = require('../config/db').sequelize;
var Sequelize = require('../config/db').Sequelize;


var Status= sequelize.define('resume_status', {
         id : {type : Sequelize.INTEGER,autoIncrement : true, primaryKey : true, unique : true },
         activation_user_id:{type : Sequelize.INTEGER},
         resume_id:{type : Sequelize.STRING},
         create_time:{type : Sequelize.INTEGER},
         update_time:{type : Sequelize.INTEGER},
         status:{type : Sequelize.INTEGER},  
         validation_user_id:{type : Sequelize.INTEGER},  
         validation_time:{type:Sequelize.INTEGER},     		 
      },
      
     {freezeTableName:true,timestamps:false})



exports.resume_additional = Resume_additional;
exports.resume_status = Status;












exports.resume_additional = Resume_additional;







