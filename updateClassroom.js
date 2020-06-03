module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/',function(req,res,next){
        res.render('updateClassroom');
    });

    router.post('/',function(req,res,next){
        var context = {};
        var mysql = req.app.get('mysql');

        mysql.pool.query("UPDATE Classrooms SET room_name=?, room_number=?, capacity=?, num_outlets=?, num_doors=? WHERE classroomID=?", 
        [req.body.room_name, req.body.room_number, req.body.capacity, req.body.num_outlets, req.body.num_doors, req.body.classroom_id],
        function(error, results,fields){
            if(error){
                res.write(JSON.stringify(error));
                console.log("error");
                res.end();
            }
            context.classrooms = results;
            console.log("classroom updated");
            res.redirect('/classrooms');
        });
    });

    return router;
}();
