var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Appearance = {
    gender: Number,
    looks: [Number],
    colors: [Number]
}

const Skill = {
    skill: Number,
    xp: Number,
    lvl: Number
}

const Attribute = {
    gnomeCourse: Number,
    barbarianCourse: Number
}

const Timer = {
    identifier: String,
    tickOffline: Boolean,
    timeLeft: Number,
    currentMs: Number
}

const Item = {
    id: Number,
    amount: Number,
    attr: Attribute
}

const ItemContainer = {
    name: String,
    items: [Item]
}

const Varp = {
    id: Number,
    state: Number
}

const userSchema = new Schema({
    passwordHash: String,
    username: String,
    displayName: String,
    previousXteas: [Number],
    x: Number,
    y: Number,
    height: Number,
    privilege: Number,
    displayMode: Number,
    runEnergy: Number,
    appearance: Appearance,
    skills: [Skill],
    attributes: Attribute,
    timers: [Timer],
    itemContainers: [ItemContainer],
    varps: [Varp]
});

export const User = mongoose.model('User', userSchema, 'rsmod-users');
