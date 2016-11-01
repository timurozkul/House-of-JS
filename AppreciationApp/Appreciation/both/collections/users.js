Users = new Mongo.Collection('users');


let UserSchema = new SimpleSchema({
    'name': {
        type: String,
        label: 'Persons name'
    },
    'email': {
        type: String,
        label: 'E-mail'
    },
    'school': {
        type: [String],
        label: 'Date of event',
        allowedValues: ["Whitgift School", "Cheltenham Ladies College", "Sevenoaks School", "Headington School", "Ardingly College"],
    }
});

Users.attachSchema(UserSchema);