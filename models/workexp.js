'use strict';
var sequelize = require('../config/db').sequelize;
var Sequelize = require('../config/db').Sequelize;


var Workexp= sequelize.define('resume_workexperiences', {
         id : {type : Sequelize.INTEGER,autoIncrement : true, primaryKey : true, unique : true },
         resume_id:{type : Sequelize.INTEGER},
         company:{type : Sequelize.STRING},
         job_months:{type : Sequelize.STRING},
         job_title:{type : Sequelize.STRING},
         job_spec:{type : Sequelize.STRING},
         job_comptype:{type : Sequelize.STRING},       
         job_salary:{type : Sequelize.STRING},
         job_text:{type : Sequelize.STRING},                
         begin_times:{type : Sequelize.STRING},
         end_times:{type : Sequelize.STRING},

         not_ended:{type : Sequelize.INTEGER},
         job_compsize:{type : Sequelize.STRING},
         underling_umber:{type : Sequelize.STRING},
         report_to:{type : Sequelize.STRING},
         company_text:{type : Sequelize.STRING},
         industry:{type : Sequelize.STRING},
         predicted_job_function:{type : Sequelize.STRING},
         work_place:{type : Sequelize.STRING},
         work_performance:{type : Sequelize.STRING},



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


exports.workexp = Workexp;


// Education.findById(10).then(function(resume) {
//   //bs.cname = 'jane' 
//   if (!resume) {return}; 

//   console.log(resume.dataValues) // 'jane'
// })