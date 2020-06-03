module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/',function(req,res){
        var context = {};
        var mysql = req.app.get('mysql')
        var boms;    
        
        //We do a nested query here because we are manipulating our results object with the results of another query and it must be done in this order so we can't count callbacks
        mysql.pool.query("SELECT * FROM Instructors", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            //results from the first query
            context.instructors = results;
            res.render('instructors', context);
        });
    });

    router.post('/',function(req,res,next){
        if(req.body.submit_type == 'Add Instructor'){
            var mysql = req.app.get('mysql');
            mysql.pool.query("INSERT INTO Instructors (first_name,last_name,title,bio) VALUES (?,?,?,?)", 
            [req.body.first_name, req.body.last_name, req.body.title, req.body.bio], function(error, result){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                res.redirect('/instructors');
            });
        }

        if(req.body.submit_type == 'Delete Instructor'){
            var mysql = req.app.get('mysql');
            mysql.pool.query("DELETE FROM Instructors WHERE instructorID=?", [req.body.instructor_choice], function(error, results){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                res.redirect('/instructors');
            });
        }
    });

    return router;
}();
