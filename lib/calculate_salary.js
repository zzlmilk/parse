var request = require('request');
var querystring=require("querystring");
var _ = require('lodash');
var async = require('async');




//根据城市和行业来定起薪
function getCitySarlary (city) {
    // body...
    var start_salary = 5000;
    var t1 = ['北京','上海','深圳'];
    var t2 = ['广州','成都','杭州',"苏州"];
    var t3 = ["天津","南京", "无锡", '武汉' ,"重庆" ,"西安" ,"厦门" ,"福州" ,"大连" ,"珠海","宁波"];
    var t4 = ['温州',"嘉兴","湖州","绍兴","金华","衢州","舟山","台州","丽水","石家庄","太原","南昌","呼和浩特",
                "沈阳","长春","哈尔滨","合肥","济南","郑州","长沙","南宁","海口","贵阳","昆明","拉萨","西安","兰州","西宁","银川","乌鲁木齐"];

    if (_.indexOf(t1,city)!=-1) {
        return 5000;
    };
    if (_.indexOf(t2,city)!=-1) {
        return 4500;
    };
    if (_.indexOf(t3,city)!=-1) {
        return 4000;
    };

    if (_.indexOf(t4,city)!=-1) {
        return 3500;
    };

    


     return 2500;

    //var t5 = [];
}


//获取手机号码归属地

var phoneCity = function  (phone,cb) {
    // body...
    var juhe_screct = "2c92ea59ec03e7ffdee6b487d103d02d";
    var url = "http://apis.juhe.cn/mobile/get";
    var dtype ="json";
    var parms={};
    parms.phone = phone;
    parms.key = juhe_screct;
    parms.dtype = dtype;


    request(url+"?"+querystring.stringify(parms),function(error,response,body) {
        // body...
        if (!error && response.statusCode == 200) {             
            var jsonString = JSON.parse(body);
            if(jsonString.resultcode !=200){
                console.log(body)
                    cb(null)
            }
            else{
                var city  = jsonString['result']['city']
                cb(city)    
            }        
        }
        else{        
            cb(null)
        }
    })

}


//计算薪资
var calculateSalary = function  (city,work_year) {
    // body...
    var start_salary = getCitySarlary(city);
    
    var end_salary ;
    if (work_year==0) {
            return start_salary;
    }
    if (work_year>20) {
        work_year = 20;
    };
    
    // var range_min = 0.9 ;
    // var range_max = 1.15;
    var scopeArray= [0.25,0.25,0.2,0.2,0.2,0.15,0.15,0.1,0.1,0.08,0.08,0.08,0.05,0.05,0.05,0.03,0.03,0.03,0.02,0.02];   
    var temp=start_salary;
    for(var i=0;i< work_year ;i++){
        
        temp=temp + scopeArray[i] * temp;
        //console.log(temp)
    }


    return end_salary = Math.round(temp)
}





exports.calculateSalary = calculateSalary;
exports.phoneCity = phoneCity;






