const Member = require('../../app/models/Members')
const { bloodGroups, date } = require('../../lib/utils');
const Intl = require('intl');

module.exports = {
    index(req, res){
        Member.all(function(members){
            return res.render('members/index', {members});
        });
    },
    create(req, res){
        Member.instructorsSelectOptions(function(options){
            return res.render("members/create", {instructorOptions: options});
        });
    },
    post(req, res){
        const keys = Object.keys(req.body);

        for(key in keys){
            if(req.body[key] == "")
            return res.send("Please, fill all fields");
        }
        Member.create(req.body, function(member){
            return res.redirect (`/members/${member.id}`);
        })
    },
    show(req, res){
        Member.find(req.params.id, function(member){
            if(!member) return res.send("Member not exist, please try again!");

            member.birth = date (member.birth).birthDay;
            member.blood = bloodGroups(member.blood);


            return res.render("members/show", {member});
        });
    },
    edit(req, res){

        Member.find(req.params.id, function(member){
            if(!member) return res.send("Member not exist, please try again!");

            member.birth = date(member.birth).iso;
            
            Member.instructorsSelectOptions(function(options){
                return res.render("members/edit", {member, instructorOptions: options});
            });
        });
    },
    put(req, res){
        const keys = Object.keys(req.body);

        for(key in keys){
            if(req.body[key] == "")
            return res.send("Please, fill all fields");
        }
        Member.update(req.body, function(){
            return res.redirect(`members/${req.body.id}`)
        });
    },
    delete(req, res){
        Member.delete(req.body.id, function(){
            return res.redirect(`members`);
        });
    },
}
