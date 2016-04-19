'use strict';
var sequelize = require('../config/db').sequelize;
var Sequelize = require('../config/db').Sequelize;


var Project= sequelize.define('resume_projects', {
         id : {type : Sequelize.INTEGER,autoIncrement : true, primaryKey : true, unique : true },
         resume_id:{type : Sequelize.INTEGER},
         project:{type : Sequelize.STRING},
         description:{type : Sequelize.STRING},
         responsibility :{type : Sequelize.INTEGER},
         tool:{type : Sequelize.INTEGER},
         hardware_environment:{type : Sequelize.INTEGER},
         software_environment:{type : Sequelize.INTEGER},
         begin_times:{type : Sequelize.INTEGER},
         end_times:{type : Sequelize.INTEGER},
         not_ended:{type : Sequelize.INTEGER},
         post:{type:Sequelize.STRING}

        // end_times:{tyep:Sequelize.STRING},
        // school:{tyep:Sequelize.STRING},
         //major:{tyep:Sequelize.STRING},
         //degree_level:{tyep:Sequelize.STRING},
   //       name:{type : Sequelize.STRING,allowNull: true},
   //       phone:{type : Sequelize.STRING},
   //       email: {type : Sequelize.STRING},
   //       dict_sex_id: {type : Sequelize.INTEGER},
   //       age: {type : Sequelize.INTEGER},
		 // birth:{type : Sequelize.STRING},
		 // dict_marries_id:{type : Sequelize.INTEGER},
		 // work_year:{type : Sequelize.STRING},
		 // marriage:{type : Sequelize.INTEGER},
		 // nationid:{type : Sequelize.STRING},
		 // city:{type:Sequelize.STRING},
		 // month_salary:{type : Sequelize.INTEGER},
		 // resume_photo:{type:Sequelize.STRING},		 
      },

     {freezeTableName:true,timestamps:false})

    

exports.project = Project;


// Education.findById(10).then(function(resume) {
//   //bs.cname = 'jane' 
//   if (!resume) {return}; 

//   console.log(resume.dataValues) // 'jane'
// })