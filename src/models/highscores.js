var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Skill = {
    skill: Number,
    xp: Number,
    lvl: Number,
    rank: Number
}

const highscoresSchema = new Schema ({
    username: String,
    totalExperience: Number,
    totalLevel: Number,
    skills: [Skill]
})

export const Highscores = mongoose.model('Highscores', highscoresSchema, 'highscores');