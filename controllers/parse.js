var request = require('request');
var FormData = require('form-data');
var fs = require('fs')
var fse = require('fs-extra');

var _ = require('lodash');

var reumseContrller  = require('./resume');
var calculateSalary = require('../lib/calculate_salary').calculateSalary;
var phoneCity = require('../lib/calculate_salary').phoneCity;

var secret_key = "5xxvAbR5TZzfSglE3uqwwANjrZIFZN000001c2ff";
var url = "https://api.youyun.com/v1/resume";





var path = __dirname+"/fileresumes/";




var ppp = "/Users/zhilingzhou/Desktop/export_resume/resumeLibs/";

 var parse = exports.parseResume = function  (file,cb) {

  console.log(file)
     var options = {
          url: url,
          //port:'443',
          path: '/',
          rejectUnauthorized: false,
          method:'POST',
        };

      

         var r = request.post(options,url, function optionalCallback(err, httpResponse, body) {
          
          if (err) {
            console.log(body)
            console.log(err)
            console.log(file)
            cb(null)
            return;            
          };


            

            // console.log(body)
            // console.log(err)
            
            var info = JSON.parse(body);   
                    
           if (info['error_code']!=0) { 
            console.log(info['error_msg']) 

            cb(null)
          }; 

           resume = getResume(info,file);  


           console.log(resume)

            cb(resume);  

        })


      
     

        var form = r.form();




        form.append('secret_key', secret_key);
        form.append('resume', fs.createReadStream(ppp+file,{ bufferSize: 2 * 1024 }));

}








 function getResume (info,file) {
      

                var data = info['data'];       
                //var source = data['src_site'];
                if (!data || !data['cv_parse']) {return;};
                var parsedata = data['cv_parse'];
                var resume={};

                var basic_info = parsedata['basic_info'];
                var contact  =   parsedata['contact'];
                var skills = parsedata['skills'];
                var languages = parsedata['languages'];
                var certificates = parsedata['certificates'];
                var self_evaluate = parsedata['self_evaluate'];
                var projects =parsedata['projects'];
                var internships =parsedata['internships'];
                var educations =parsedata['educations'];
                var occupations = parsedata['occupations'];
                var job_objective = parsedata['job_objective'];

               resume.fime_name =file;
               
                if (!contact) {return};
               
                resume.phone = contact['mobile'];
                if (!resume.phone)  {return null };

                resume.email = contact['email'];
                resume.qq = contact['qq'];
                //resume.age = 

               

                if (basic_info != undefined) {
                resume.name =basic_info['name'];
                resume.birth = basic_info['birthday'];
                if(basic_info['work_experience'])
                 resume.exp = (2016 - basic_info['work_experience']);
                 resume.sex = basic_info['gender'];
                 resume.age = 0;
                };

                resume.marriage = basic_info['marriage_status'];
                resume.city = basic_info['location']['city'];

                resume.last_job_salary = calculateSalary(resume.city,resume.exp);
             
                resume.province = basic_info['location']['province'];
                resume.nationid = basic_info['id_number'];
                resume.nation = basic_info.nation;
                //resume.resume_create_time =  
                //resume.resume_update_time = 
                //resume.resume_photo =  没有改数据
                /*
                上传信息表
                resume.doc_name 
                resume.file_type
                resume.complete_score
                resume.create_time
                upload_user_id
                */
                //教育经历
                resume.education = [];
                _.forEach(educations,function  (e) {
                   var tmp = {};
                   tmp.school_name = e.school;
                   tmp.school_year_start = e.start_time;
                   tmp.school_year_end =  e.end_time;
                   tmp.degree_level =  e.degree;
                   tmp.major_name = e.major;
                   tmp.school_level = e.school_level;
                   tmp.not_ended = e.not_ended; //如果有"至今" not_ended 为 1,否则为 0
                   resume.education.push(tmp)
                  // resume.educations_text+= _.join(e,";")
                })
                //工作经历
                resume.workexp = [];
                _.forEach(occupations,function  (e) {
                   var tmp = {};
                   tmp.job_company = e.company;
                   tmp.job_title =  e.title;
                   tmp.job_year_start =  e.start_time;
                   tmp.job_year_end =  e.end_time;
                   tmp.not_ended = e.not_ended;                                      
                   tmp.report_to = e.report_to; 
                   tmp.industry = e.industry;
                   tmp.predicted_job_function = e.predicted_job_function;                   
                   tmp = parseWorkexp(e.desc,tmp);                            
                   resume.workexp.push(tmp)
                   //resume.workexps_text+= _.join(e,";")
                })
                //projects
                resume.projects = [];                
                _.forEach(projects,function  (e) {
                   var tmp = {};
                   tmp.p_name = e.name;
                   tmp.p_year_start =  e.start_year +"/"+e.start_month;
                   tmp.p_year_end =  e.end_year +"/"+e.end_month;;
                   
                   tmp.not_ended = e.not_ended;
                   tmp.post = e.post;  
                   // tmp.hardware_environment = "";
                   // tmp.software_environment = "";
                   // tmp.tool = "";
                   // tmp.duty = "";
                   tmp = parseProject(e.desc,tmp)
                   resume.projects.push(tmp)
                   //resume.projects_text+= _.join(e,";")
                })

                
                 resume.internships = [];                
                _.forEach(internships,function  (e) {
                   var tmp = {};
                   tmp.title = e.title;
                   tmp.internships_year_start =  e.start_year +"/"+e.start_month;
                   tmp.internships_year_end =  e.end_year +"/"+e.end_month;;
                
                   resume.internships.push(tmp)
                })


              //skills
               resume.skills=[];
              if (skills) {
              resume.skills_skills = [];   
              
                  resume.skills_skills = skills.skills;
                            
                  resume.skills_extract = skills.extract;
                                    
                if (skills.skills) {
                  if (skills.skills[0]) {
                        var skillArray = skills.skills[0].split('\n');
                      _.forEach(skillArray,function  (s) {
                      // body...
                      var skill = getSkill(s);
                      if(skill) 
                      resume.skills[resume.skills.length++] = skill;                        
                    })  
                  };
                };


            };       
                
                resume.languages=[];
                if (languages) {
                //languages
                resume.languages_language = languages.language;
                resume.languages_extract = languages.extract;

                
                if (languages.language) {
                if (languages.language[0]) {
                  var values =  languages.language[0].trim().replace(/(（\S+）)/g,"$1").replace(/（/g,"").replace(/）/g,"").replace(/：/g,":").split("\n")
                values = values.map(function(v) { 
                    if(v.match(/语/)){
                       return v.trim(); 
                    }
                    else{
                      return "";
                    }
                 
                }); 
               
                   languages = _.union(languages, values);                            
                   _.forEach(languages,function  (l) {
                    // body...
                    var language = getLanguage(l);
                    if(language) 
                    resume.languages[resume.languages.length++] = language;                    
                  })    
                };

              };
                           
             };          

             if (certificates) {     
                //certificates
                resume.certificates_certificates = certificates.certifications;
                resume.certificates_extract = certificates.extract;
                };  
                /*
                    1: "在职,正在找工作"
                    2: "在职,考虑好的职业机会"
                    3: "在职,暂不考虑新的职业机会"
                    4: "已离职,可快速到"
                    5: "应届毕业生"

                */

                //自我评价
                resume.self_evaluate = self_evaluate;
                //求职意向
                resume.job_objective = {};
                if (job_objective) {
                if (job_objective.status) {
                resume.job_objective.status_code =job_objective.status.status_code;
                resume.job_objective.status_msg =job_objective.status.status_msg;
                };
                resume.job_objective.industries =job_objective.industries;
               //  resume.job_objective.city =job_objective.expect_location.city;
                // resume.job_objective.province =job_objective.expect_location.province;
                resume.job_objective.expect_worktype =job_objective.expect_worktype;
                resume.job_objective.expect_salary_upper =job_objective.expect_salary_upper;
                resume.job_objective.expect_salary =job_objective.expect_salary;
                resume.job_objective.expect_salary_floor =job_objective.expect_salary_floor;






};





         
              var uninx_time =  Date.parse(new Date());
              resume.crrent_time =Math.round(new Date().getTime()/1000); 
              resume.resume_complete_score = sanityCheck(resume)
               return resume;
}



function sanityCheck (data) {
    
    if(!data.phone)
      return  console.log( "phone is null");


         
    var perfectNumber = 0 ;
    var number = 100/17;
   if(data.name){perfectNumber+=number;}
   if(data.phone){perfectNumber+=number;} 
   if(data.email){perfectNumber+=number;}
   if (data.sex) { perfectNumber+=number;};
   if (data.age) { perfectNumber+=number;};
   if (data.birth) { perfectNumber+=number;};
   if (data.marriage) { perfectNumber+=number;};
   if (data.exp) { perfectNumber+=number;};
   if (data.nationid) { perfectNumber+=number;};
   if (data.city) { perfectNumber+=number;};
   if (data.last_job_salary) { perfectNumber+=number;};
   if(data.headerImg) { perfectNumber+=number;};
   if(data.workexp.length>0){perfectNumber+=number;}
   if(data.education.length>0){ perfectNumber+=number;}
   if(data.skills.length>0)perfectNumber+=number;
   if(data.languages.length>0)perfectNumber+=number;
   if(data.projects.length>0)perfectNumber+=number;
   
    perfectNumber =  Math.round(perfectNumber)
    return perfectNumber;
  

}





function getSkill(skill) {
  // body...
   
    skill = skill.replace(/：/g," ").replace(/:/g,"").replace(/\|/g,"")
   
    var skill = _.compact(skill.split(" "));
    // console.log(skill.length)
    if(skill.length!=3){
            return;
       }
       var tmp = {};
       tmp.skill_name =  skill.shift().trim();
       tmp.skill_master = skill.shift().trim();
       var t = skill.shift().trim().match(/(\d*)/g);
       if(t){
              tmp.skill_time = t[0];
            }
        return tmp;

}

function getLanguage (language) {
  // body...
  language = language.split(':');

 if(!language || language.length <= 1)
    return null; 

  var tmp = {};
  var la = language.shift().trim().match(/(\S语)/g);
  if (!la ) {return};
  tmp.language_name  = la[0];
  var master = language.shift().trim();
  if(master = master.match(/良好|一般|精通|熟练$/g)){
       tmp.language_degree = master[0];
  }

  return tmp;
}

function parseProject (des,tmp) {
  // body...
  var m;
  var project = des;
  project =project.replace(/：/g,":")

  if(m=project.match(/软件环境:[^\n:]*/)) {
      tmp.software_environment = m[0].trim(); 
      project= project.replace(m[0],'');  
   }

   if(m=project.match(/开发工具:[^\n:]*/)) {
      tmp.tool = m[0].trim()
      project= project.replace(m[0],'');  
   }

   if(m=project.match(/硬件环境:[^\n:]*/)) {
     tmp.hardware_environment = m[0].trim();
      project= project.replace(m[0],'');  
   }
  if(m=project.match(/责任描述:[^\n:]*/)) {
      tmp.duty = m[0].trim()
      project= project.replace(m[0],'');  
   }
  

    tmp.project_escription =project;

    return tmp;


   /*
                  tmp.p_name = e.name;
                   tmp.p_year_start =  e.start_year +"/"+e.start_month;
                   tmp.p_year_end =  e.end_year +"/"+e.end_month;;
                   tmp.project_escription = e.desc;
                   tmp.not_ended = e.not_ended;
                   tmp.post = e.post;  
                   tmp.hardware_environment = "";
                   tmp.software_environment = "";
                   tmp.tool = "";
                   tmp.duty = "";

   */




}


function parseProject (des,tmp) {
  // body...
  var m;
  var project = des;
  project =project.replace(/：/g,":")

  if(m=project.match(/软件环境:[^\n:]*/)) {
      tmp.software_environment = m[0].trim(); 
  //    project= project.replace(m[0],'');  
   }

   if(m=project.match(/开发工具:[^\n:]*/)) {
      tmp.tool = m[0].trim()
    //  project= project.replace(m[0],'');  
   }

   if(m=project.match(/硬件环境:[^\n:]*/)) {
     tmp.hardware_environment = m[0].trim();
     // project= project.replace(m[0],'');  
   }
  if(m=project.match(/责任描述:[^\n:]*/)) {
      tmp.duty = m[0].trim()
    //  project= project.replace(m[0],'');  
   }
  

    tmp.project_escription =project;

    return tmp;



   /*
                  tmp.p_name = e.name;
                   tmp.p_year_start =  e.start_year +"/"+e.start_month;
                   tmp.p_year_end =  e.end_year +"/"+e.end_month;;
                   tmp.project_escription = e.desc;
                   tmp.not_ended = e.not_ended;
                   tmp.post = e.post;  
                   tmp.hardware_environment = "";
                   tmp.software_environment = "";
                   tmp.tool = "";
                   tmp.duty = "";

   */


}


function parseWorkexp (des,tmp) {

  var m;
  var workexp = des;
  workexp =workexp.replace(/：/g,":")

  
    //console.log(workexp+"\n")
     //tmp.job_text= des;
     

  if(m=workexp.match(/公司描述:[^\n:]*/)) {
      tmp.company_text = m[0].trim()
      //workexp= workexp.replace(m[0],'');  
   }
   
  
   if(m=workexp.match(/(公司规模|规模):[^\n:]*/)) {
      tmp.job_compsize = m[0].trim();
    //  workexp= workexp.replace(m[0],'');
   }

    if(m=workexp.match(/(企业性质|公司性质):(.*)?/)) {
      
      tmp.job_comptype = m[2].trim();
    //  workexp= workexp.replace(m[0],'');
   }

   if(m=workexp.match(/公司行业:[^\n:]*/)) {      
      tmp.job_spec = m[0].trim();
   //   workexp= workexp.replace(m[0],'');
     
   }

   if(m=workexp.match(/下属人数:[^\n:]*/)) {
      tmp.underling_umber = m[0].trim();
 //     workexp= workexp.replace(m[0],'');
   }

   if(m=workexp.match(/工作地点:[^\n:]*/)) {
      tmp.work_place = m[0].trim();
   //   workexp= workexp.replace(m[0],'');
   }

   if(m=workexp.match(/工作业绩:[^\n:]*/)) {
      tmp.work_performance = m[0].trim();  
   //   workexp= workexp.replace(m[0],'');   
   }
   if(m=workexp.match(/职位:[^\n:]*/)) {
      tmp.work_title = m[0].trim().replace("职位:","");
   //   workexp = workexp.replace(m[0],'');
   }
    if(m=workexp.match(/汇报对象:[^\n:]*/)) {
      tmp.work_title = m[0].trim().replace("职位:","");
  //    workexp = workexp.replace(m[0],'');
   }
   if(m=workexp.match(/证 明 人:[^\n:]*/)) {
      tmp.work_title = m[0].trim().replace("职位:","");
  //    workexp = workexp.replace(m[0],'');
   }

  if(m=workexp.match(/(\d.*)元\/月/)){
      tmp.job_salary = m[1];
   //   workexp=workexp.replace(m[0],'');
  }

  if(m=workexp.match(/工作描述:[^\n:]*/)) {
      tmp.job_text = m[0].trim()
   //   workexp = workexp.replace(m[0],'');
   }




// var reg = workexp.match(/工作描述/);


// var pattern =new RegExp("(\\(.*?\\))");
// workexp = workexp.replace(/（/,'(').replace(/）/,')')
// var wm = workexp.match(pattern)



// if (wm) {
//   workexp = workexp.replace(wm[0],'')
// };


    //workexp = workexp.substring(reg.index,workexp.length)

  // if(['外资(欧美)', '外资(非欧美)', '合资(欧美)', '合资(非欧美)', '国企', '民营公司', '外企代表处', '政府机关', '事业单位', '非盈利机构', '其它性质'].indexOf(workexp) != -1) {
  //     tmp.job_comptype = exp;         
  tmp.job_text= workexp;  
   
  return tmp;

     
     
    

  //return tmp;
}







/*
// return;
*/

function walkdir (dirname ,callback) {
  // body...
  fs.readdir(dirname,function(err,list){
    if(err){
      callback(err,null);
      return;
    }
    callback(null, list);

  });
}


var jlfile = "/Users/zhilingzhou/Desktop/export_resume/resumeLibs/";


function create (resume,l) {
  // body...
  reumseContrller.createResume(resume,function  (n_r) {
        // body...           console.log(n_r +"aa")     
      
        fse.move(jlfile+"/"+l,"/Users/zhilingzhou/Desktop/export_resume/pase_resumes/"+l,function  (err) {
          // body...
          if (err) return console.error(err)

                  console.log(" move success!")    
        })

      });
}





function goData (offset,limit) {
    // body...
walkdir(jlfile,function  (err,list) {
  // body...
  console.log("zl简历有"+list.length);

 list.slice(offset,limit).filter(function  (l) {
  console.log(l)
   // body...   
    parse(l,function (resume) {
      // body...
      //console.log(resume);  
      if (resume) {
        
         create(resume,l);
       }
       else{
       
          fse.move(jlfile+"/"+l,"/Users/zhilingzhou/Desktop/export_resume/unpase_resumes/"+l,function  (err) {
          // body...
          if (err) return console.error(err)
                  console.log(" move success!")    
        })
       }
     

      })
   })

})

}


var async = require('async');

function eachGoData(){

    var arr = [0,1,2,3,4,5,6,7,8,9];
    //var arr = [0]
    async.every(arr,function (item,callback) {
        goData(100*item,100+100*item)
    })   
}






var mode = 1

if (mode ==1) {

var tenMins = 1000 * 60 * 6; // one second = 1000 x 1 ms


 var i = 0;
 
 if (i== 0) {
  eachGoData()

 };
var timeout = setInterval(function() {
  if (i>100) {
    console.log("oneSecond")
     clearTimeout(this);
    return;
  };
   eachGoData()
   i++
}, tenMins);

};





    


if (mode ==0) {

var test_file = "51job_包军(91408323).mht";
parse(test_file,function(resume) {


   // body...
   console.log(resume)
   create(resume,test_file);


})

};



if (mode ==2) {
        goData(0,100);
};


// var  string = "软件环境: \nc++，opencv,tessract \n硬件环境: \narm,android,PC \n开发工具: \nVC++,eclipse \n责任描述: \n基于adaboost分类器，边缘检测，精确定位各元素位置，倾斜校正，字符精分割，数字识别（基于模板），汉字识别(OCR)（基于改进的tessract库），移植到android系统。 \n项目描述: \n根据身份证正反面图像，分别识别数字和汉字信息，其中，数字识别率99%以上，汉字识别率92%以上。 \n'";

// string = string.replace(/：/g,":")
// //console.log(string)

// string = string.match(/软件环境:[^.\n:]*/)

// console.log(string)





