Template.main.onRendered( () => {
    Session.set('currentSchool');
});

Template.main.helpers({
    school(){
        let schools = ["Whitgift School", "Cheltenham Ladies College", "Sevenoaks School", "Headington School", "Ardingly College"];
        return schools;
    },
    displayUsers(){
        let school = Session.get('currentSchool');
        return Users.find({school: school}).fetch();
    }
});