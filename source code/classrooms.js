module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/',function(req,res,next){
        var context = {};
        var mysql = req.app.get('mysql')

        mysql.pool.query("SELECT * FROM Classrooms", function(error, results,fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.classrooms = results;

            res.render('classrooms', context);
        });
    });

    router.post('/',function(req,res){
        res.render('classrooms');

    });

    return router;
}();
