module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/',function(req,res){
        var context = {};
        var mysql = req.app.get('mysql')
        mysql.pool.query("SELECT * FROM Classes", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.classes = results;
            res.render('classes', context);
        });
    });

    router.post('/',function(req,res){
        console.log(req.body);
        
        if(req.body.submit_type == 'Add Class'){
            var mysql = req.app.get('mysql');
            mysql.pool.query("INSERT INTO Classes (title,start_at,end_at,day,capacity) VALUES (?,?,?,?,?)", 
            [req.body.class_title_input, req.body.start_time, req.body.end_time, req.body.day_input, req.body.capacity_input], function(error, result){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                res.redirect('/classes');
            });
        }

        if(req.body.submit_type == 'Delete Class'){
            var mysql = req.app.get('mysql');
            mysql.pool.query("DELETE FROM Classes WHERE classID=?", [req.body.class_choice], function(error, results){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                res.redirect('/classes');
            });
        }

    });


    return router;
}();
