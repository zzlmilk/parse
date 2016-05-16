'use strict';

var Sequelize = require('sequelize');
var sequelize = new Sequelize('51job','postgres','hirelib',{host : '183.131.78.101', port : '5432', dialect : 'postgres'});


var Baseinfo= sequelize.define('baseinfo', {
         id : {type : Sequelize.INTEGER,autoIncrement : true, primaryKey : true, unique : true },
         cname:{type : Sequelize.TEXT},
         gender:{type : Sequelize.TEXT},
         birth:{type : Sequelize.TEXT},
         region :{type : Sequelize.TEXT},
         hukou:{type : Sequelize.TEXT},
         salary:{type : Sequelize.TEXT},
         workyear:{type : Sequelize.TEXT},
         address:{type : Sequelize.TEXT},
         postcode:{type : Sequelize.TEXT},
         email:{type : Sequelize.TEXT},
         mob:{type : Sequelize.TEXT},
         hometel:{type : Sequelize.TEXT},
         website:{type : Sequelize.TEXT},
         worktype:{type : Sequelize.TEXT},
         industry:{type : Sequelize.TEXT},
         location:{type : Sequelize.TEXT},
         monsalary:{type : Sequelize.TEXT},
         jobpost:{type : Sequelize.TEXT},
         remark:{type : Sequelize.TEXT},   
      },
    
     {freezeTableName:true,timestamps:false})


var pams = {};
pams.gender = '女';
pams.region = "上海市"
pams.hukou = "上海"

Baseinfo.findOne({where:pams}).then(function  (b) {
    // body...
        console.log(b)

})





