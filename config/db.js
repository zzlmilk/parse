'use strict';


var Sequelize = require('sequelize');
exports.Sequelize = Sequelize;

//测试服
//var sequelize = new Sequelize('hirelib_public','postgres','hirelib',{host : '61.174.13.143', port : '5432', dialect : 'postgres'});
//正式服
var sequelize = new Sequelize('hirelib_public','postgres','hirelib',{host : '183.131.78.101', port : '5432', dialect : 'postgres'});
exports.sequelize = sequelize;






//正式服  sequelize 
// var sequelize_employer = new Sequelize('employer','postgres','hirelib',{host : '183.131.78.101', port : '5432', dialect : 'postgres'});
// exports.sequelize_employer = sequelize_employer;










/*
var Baseinfo= sequelize.define('baseinfo', {
         id : {type : Sequelize.INTEGER, 
          autoIncrement : true, 
          primaryKey : true,
           unique : true 
          },
          cname:{type : Sequelize.STRING}          
      },{freezeTableName:true,timestamps:false})



   
 
Baseinfo.findOne({ where: { id: '1' } }).then(function(bs) {
  //bs.cname = 'jane'
  console.log(bs.cname) // 'jane'


})
*/
   

       


