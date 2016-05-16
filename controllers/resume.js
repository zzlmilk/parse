var multiparty = require('multiparty');
var file_lib = require('./file');
var parse = require('./parse');
var Resume = require('../models/resume');



exports.postResume = function  (req,res,next) {
    // body...
    var form = new multiparty.Form();
        form.on('error', next);

        form.on("file",function (name,file) {
            // body...           
             filename =file.originalFilename.split('/');
             
             filename =filename[filename.length-1]
                          
            file.path = file.path;

            file_lib.upload(file.path,filename,function (argument) {
                // body...
                parse.parseResume(filename,function (resume) {
                        // body...                       
                        res.json({ "resume": resume });

                    });
            })

        })

    form.parse(req);

}



exports.createResume = function(data,cb){
  if (!data) {return};
  
    if (!data.phone) {
         console.log("phone is null");
      return
    };

   Resume.findResumeDetailByphone(data.phone,function(r){
        if (!r) {
                  Resume.bulidReusme(data,function(r){   
                
                   cb(r)
                })
              }
        else{
          console.log("resume has one");
        cb(null)          
        
        }        
    })
}




exports.deleteResume = function(data){
  if (!data) {return};

   Resume.findResumeDetailByphoneForDelete(data.phone,function(r){

        r.destroy();
        
        if (!r) {
            
      }
        else{          
          console.log("resume has one");
          // 
        }
        
    })
}














/*
var file = {};
    var title;

    form.on('error', next);

    form.on('close', function(){

         res.send(file)
    });



  // listen on field event for title
  form.on('field', function(name, val){
    if (name !== 'title') return;
    title = val;
  });



  form.on('part', function(part){
    if (!part.filename) return;
    if (part.name !== 'file') return part.resume();
    file.filename = part.filename;
    file.size = 0;
    part.on('data', function(buf){

      file.data =  buf;
      file.size += buf.length;   
      
    });
  });

  // parse the form
    form.parse(req);

*/