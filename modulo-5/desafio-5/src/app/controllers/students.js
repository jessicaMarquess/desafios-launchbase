const { date, tip } = require('../../lib/utils');
const Student = require('../../app/models/Student')
const Intl = require("intl");

module.exports = {
    index(req, res){
            Student.all(function(students){
                return res.render('students/index', {students});
            });
    },
    create(req, res){
        Student.teachersSelectOptions(function(options){
            return res.render("students/create", {teacherOptions: options});
        });
    },
    post(req, res){
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Preencha todos os valores!");
        }
        Student.create(req.body, function(student){
            return res.redirect(`/students/${student.id}`);
        });
    },
    show(req, res){
        Student.find(req.params.id, function(student){
            if(!student) return res.send("Student not exist, please try again!");

            student.birth_date = date(student.birth_date).birthDay;
            student.grade = tip(student.grade);

            return res.render("students/show", {student});
        });
    },
    edit(req, res){
        Student.find(req.params.id, function(student){
            if(!student) res.send("Student not exist, please try again");

            student.birth_date = date(student.birth_date).iso;

            Student.teachersSelectOptions(function(options){
                return res.render("students/create", {teacherOptions: options});
            });
        });
    },
    update(req, res){
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Preencha todos os valores!");
        }

        Student.update(req.body, function(){
            return res.redirect(`/students/${req.body.id}`);
        });
    },
    delete(req, res){
        Student.delete(req.body.id, function(){
            return res.redirect(`students`);
        });
    }
}