'use strict';
var sequelize = require('../config/db').sequelize;
var Sequelize = require('../config/db').Sequelize;

var Education = require('./education').education;
var Workexp = require('./workexp').workexp;
var Project = require('./project').project;
var Language = require('./skill').language;
var Skill = require('./skill').skill;
var Reward = require('./resume_reward').reward;
var Resume_additional = require('./resume_additional').resume_additional;
var Resume_status = require('./resume_additional').resume_status;

var _ = require('lodash');
var async =require('async');



var Resume = sequelize.define('resume_inherits', {
         id : {type : Sequelize.INTEGER,autoIncrement : true, primaryKey : true, unique : true },
         user_id:{type:Sequelize.INTEGER},
         upload_uid:{type:Sequelize.INTEGER},
         upload_uname:{type : Sequelize.STRING},
         name:{type : Sequelize.STRING,allowNull: true},
         phone:{type : Sequelize.STRING},
         email: {type : Sequelize.STRING},
         qq: {type : Sequelize.STRING},
         //dict_sex_id: {type : Sequelize.INTEGER},
         sex:{type : Sequelize.STRING},
         age: {type : Sequelize.INTEGER},
         birth:{type : Sequelize.STRING},
         //dict_marries_id:{type : Sequelize.INTEGER},
         dict_industry_level1_id:{type:Sequelize.INTEGER},
         work_year:{type : Sequelize.STRING},
         marriage:{type : Sequelize.INTEGER},
         nationid:{type : Sequelize.STRING},
         city:{type:Sequelize.STRING},
         price:{type:Sequelize.FLOAT},
         province:{type:Sequelize.STRING},
         nation:{type:Sequelize.STRING},
         status:{type : Sequelize.INTEGER},
         source:{type : Sequelize.STRING},
                
         month_salary:{type:Sequelize.INTEGER},
         resume_photo:{type:Sequelize.STRING},

         job_objective_industries:{type:Sequelize.STRING},
         job_objective_status_code:{type:Sequelize.INTEGER},
         job_objective_status_msg:{type:Sequelize.STRING},
         job_objective_expect_worktype:{type:Sequelize.STRING},
         job_objective_city:{type:Sequelize.STRING},
         job_objective_province:{type:Sequelize.STRING},
         job_objective_expect_salary_floor:{type:Sequelize.STRING},
         job_objective_expect_salary_upper:{type:Sequelize.STRING},
         self_evaluate:{type:Sequelize.TEXT},
         internships_text:{type:Sequelize.TEXT},
         skills_extract:{type:Sequelize.TEXT},
         certificates_extract:{type:Sequelize.TEXT},
         //certificates_text:{type:Sequelize.TEXT},
         resume_complete_score:{type:Sequelize.INTEGER},
         languages_extract:{type:Sequelize.TEXT},
         resume_create_time:{type:Sequelize.DATE},
         resume_update_time:{type:Sequelize.DATE},
         school:{type:Sequelize.STRING},

          educations_text:{type:Sequelize.TEXT},
          projects_text:{type:Sequelize.TEXT},
          workexps_text:{type:Sequelize.TEXT},
          certificates_text:{type:Sequelize.TEXT},
          fime_name:{type:Sequelize.STRING},
          resume_secret:{type:Sequelize.INTEGER},


      },
       {freezeTableName:true,timestamps:false} 
     )


    Resume.hasMany(Education, {foreignKey: 'resume_id',as:"educations"});
    Resume.hasMany(Workexp,   {foreignKey: 'resume_id',as:"workexps"});
    Resume.hasMany(Project,   {foreignKey: 'resume_id',as:"projects"});
    Resume.hasMany(Language,  {foreignKey: 'resume_id',as:"languages"});
    Resume.hasMany(Skill,     {foreignKey: 'resume_id',as:"skills"});
    Resume.hasMany(Reward,    {foreignKey: 'resume_id',as:"rewards"});
    Resume.hasOne(Resume_additional, {foreignKey: 'resume_id',as:"resume_additional"});
    Resume.hasOne(Resume_status,     {foreignKey: 'resume_id',as:"resume_status"});

exports.bulidReusme = function (resume,callback) {
    
        Resume.build({
            user_id : 70,
            status:0,  //默认已上传
            upload_uid:70,
            upload_uname:"周大作",
            source:"rex上传的简历",
            price:3,
            name:resume.name,
            phone:resume.phone,
            email:resume.email,
            qq:resume.qq,
            sex:resume.sex,
            age:resume.age,
            birth:resume.birth,
            resume_complete_score:resume.resume_complete_score,

            //dict_marries_id:resume.dict_marries_id,
            work_year:resume.exp,
            marriage:resume.marriage,
            city:resume.city,
            province:resume.province,
            nation:resume.nation,
            nationid:resume.nationid,
            month_salary:resume.last_job_salary,
            resume_photo:resume.resume_photo,

            //自我评价
            self_evaluate:resume.self_evaluate,
            //求职意向
            job_objective_industries:resume.job_objective.industries,
            job_objective_status_msg:resume.job_objective.status_msg,
            job_objective_status_code:resume.job_objective.status_code,
            job_objective_expect_worktype:resume.job_objective.expect_worktype,
            job_objective_expect_salary_upper:resume.job_objective.expect_salary_upper,
            //job_objective_expect_salary:resume.job_objective.expect_salary,
            job_objective_expect_salary_floor:resume.job_objective.expect_salary_floor,



             //证书
            //certificates_text:_.join(resume.certificates_certificates,";"),
            certificates_extract:_.join(resume.certificates_extract,";"),

             //语言和技能的extract
             skills_extract:_.join(resume.skills_extract,";"),

             languages_extract:_.join(resume.languages_extract,";"),

             
             educations_text:_.join(resume.education,";"),

              projects_text:_.join(resume.projects,";"),
              workexps_text:_.join(resume.workexp,";"),
          

             fime_name:resume.fime_name,
             resume_create_time:new Date(Date.now() + (8 * 60 * 60 * 1000)),
             resume_update_time:new Date(Date.now() + (8 * 60 * 60 * 1000)),

        }).save().then(function(r) {
            if (!r.id) {return};
                async.applyEach([
                    function(id,cb){
                     Resume_additional.build({
                         resume_id:id,
                         doc_name:resume.doc_name,
                         file_type:resume.file_type,
                         complete_score:resume.complete_score,
                         create_time:resume.crrent_time,
                         upload_user_id:70,
                     }).save().then(function(addtion){
                            console.log("addtion save");
                     });
                    },
                 function (id,cb) { 
                    if (!resume.education) return;       
                    resume.education.forEach(function (e) {
                     // body...
                    Education.build({
                    resume_id:id,
                    school:e.school_name,
                    major:e.major_name,
                    degree_level:e.degree_level,
                    begin_times:e.school_year_start,
                    end_times:e.school_year_end,
                    not_ended:e.not_ended,
                    }).save().then(function(e){     
                         console.log("Education save")                                              
                         //cb(null);    
                       });
                    })                  
                },
                function (id,cb) {  
                if (!resume.workexp) return;                
                      resume.workexp.forEach(function  (w) {
                    // body...
                        Workexp.build({
                        resume_id:id,

                        company:w.job_company,
                        job_months:w.job_months,
                        job_title:w.job_title,
                        job_spec:w.job_spec, //职级
                        job_comptype:w.job_comptype,
                        job_salary:w.job_salary,
                        job_text:w.job_text,
                        begin_times:w.job_year_start,
                        end_times:w.job_year_end,
                        industry:w.industry,
                        predicted_job_function:w.predicted_job_function,
                        report_to:w.report_to,
                        not_ended:w.not_ended,


                        }).save().then(function(w){
                            // cb(w);
                             console.log("workexps save")
                        });
                    })
                     
                  },
                    function (id,cb) {
                        if (!resume.projects) return;       
                        resume.projects.forEach(function  (p) {
                            // body...
                            Project.build({
                            resume_id:r.id,
                            project:p.p_name,
                            description:p.project_escription,
                            responsibility:p.duty,
                            tool:p.tool,
                            post:p.post,
                            hardware_environment:p.hardware_environment,
                            software_environment:p.software_environment,
                            not_ended:p.not_ended,
                            begin_times:p.p_year_start,
                            end_times:p.p_year_end
                            }).save().then(function(p){
                                console.log("projects save")
                                //cb(p);
                            }); 
                        })
                    // body...
                    
                    },
                    function (id,cb) {
                    // body...
                    if (!resume.languages) return;
                       resume.languages.forEach(function  (l) {
                        // body...
                        Language.build({
                        resume_id:r.id,
                        language_name:l.language_name,
                        language_degree_name:l.language_degree_name,                        
                        }).save().then(function(l){
                                console.log("language save")
                        });
                    })
                    
                    },
                    function (id,cb) {
                 if (!resume.skills) return;
                     resume.skills.forEach(function  (s) {
                        // body...
                        Skill.build({
                        resume_id:r.id,
                        skill_name:s.skill_name,
                        skill_master:s.skill_master,                        
                        skill_time:s.skill_time,
                        }).save().then(function(s){
                            console.log("Skill save")
                        }); 
                    })
                    
                    },
                    function (id,cb) {
                         Reward.build({
                               resume_id:r.id,
                               employer_account_id:70,
                               increase:3,
                               type:0,
                               expiration_time: resume.crrent_time,
                        }).save().then(function (argument) {
                            // body...
                            console.log("Reward save")
                        })
                    },
                    function(id,cb){
                       
                    },
                    function(id,cb){

                    },
                  ],r.id,function (err) {
                     console.log('save err: ', err);
                     // body...
                    // cb(r);   
                    //

                })
                    
            callback(r)
        });
}



exports.findResumeDetailByphone = function (phone,cb) {
    Resume.findOne({ where: { phone: phone }}).then(function(resume) {
  //bs.cname = 'jane' 
        cb(resume);
    })  
}



exports.findResumeDetailByphoneForDelete = function (phone,cb) {
    Resume.findOne({ where: { phone: phone } ,include:[
        {model: Education ,as :"educations" },
        {model: Workexp ,as :"workexps" },
        {model: Project ,as :"projects" },
        {model: Language ,as :"languages" },
        {model: Skill ,as :"skills" },
        {model:Reward ,as :"rewards"}, 
        {model:Resume_additional ,as :"resume_additional"}
    ]

    }).then(function(resume) {
  //bs.cname = 'jane' 
        cb(resume);
    })  
}


// this.findResumeDetailByphoneForDelete("15088062234",function  (res) {
//     console.log(res)
//     // body...
// })











