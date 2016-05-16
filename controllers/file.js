var fs = require('fs');
var path = __dirname+"/fileresumes/";
var walker = require('node-walker');
var fse = require('fs-extra');






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




exports.walker = function  (path) {
    // body...
    var walker = require('node-walker');
      walker( path, 
        function (errorObject, fileName, fnNext) {
            if (errorObject) throw errorObject;
            // a filename has been provided
            if (fileName !== null) {
              // do something with that filename
               
                  //.(html|doc|docx|mht)$
           if (fileName.search(/.mht$/) != -1) {
                  console.log('File: ' + fileName);
                  // setTimeout( a(fileName,function  (pares_resume) {
                  //     // body...
                  //     // reumseContrller.deleteResume(pares_resume);                    // return;
                  //      reumseContrller.createResume(pares_resume,function (n_r) {
                  //           // body... 
                  //           console.log(n_r.id)

                  //         });

                  //   }),2000)

                  
                    var filename =fileName.split('/');             
                    filename =filename[filename.length-1]
                   fse.move(fileName, "/Users/zhilingzhou/Desktop/export_resume/resumeLibs/"+filename, function (err) {
                        if (err) { 
                          console.error(err)
                          fse.remove(fileName,function  (err) {
                            // body...
                            console.log(" remove success!")    
                          })

                        }
                        console.log(" move success!")                    
                    })
              }
               
       }

            // all files have been read, fileName is null
            if (fileName === null) {

                // continue with some other task
                return;
            }

            // call next(); when you want to proceed
            if (fnNext) 
                fnNext();
        }
    );


}






this.walker("/Users/zhilingzhou/Desktop/export_resume/unpase_resumes");




// var st = "（5个月） 1.管理新员工入职培训。整理更新材料，协调讲师，安排培训教室，组织破冰，现场管理 2.组织实施刷新培训，培训内容包括安全、质量及疾病控制，并担任疾病控制讲师 3.管理新员工试用期追踪，撰写《新员工试用期管理流程》 4.协助跟踪技术岗位培训生培养计划，30名毕业生顺利通过关键岗位评估 5.完善培训档案。整理培训记录，归档培训材料";
// st = st.replace(/（/,'(').replace(/）/,')')


// var pattern =new RegExp("(\\(.*?\\))");

// var m = st.match(pattern)

// st = st.replace(m[0],'')

// console.log(st)










