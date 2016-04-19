var fs = require('fs');
var path = __dirname+"/fileresumes/";


exports.write =function (filename,data,cb) {
   fs.writeFile(path+filename,data,function(err){
        if (err) {console.log(err); return;};
        console.log('save ok!');
        cb(null);
    });
}



exports.upload =function (file_path,filename,cb) {
    ///var/www/resumeUpload/html/51job_浼姣(327375726).doc

   fs.rename(file_path,path+filename,function(err){
        if (err) {console.log(err); return;};
        console.log('save ok!');       
        cb(null);
    });

}


 // var str = "var/www/resumeUpload/html/51job_浼姣(327375726).doc"
 //     str =str.split('/')
 //     console.log(str[str.length-1])