var { buildSchema } = require('graphql');
var mongoose = require('mongoose');
import { skills } from '../utility/skills';
import { User } from '../models/user';
import { Highscores} from '../models/highscores';

const uri = "mongodb+srv://frostweb:p7p2Oxzbd84CxQHP@frostspire-dev-tir3e.mongodb.net/frostspire_server?retryWrites=true&w=majority";

function connectToDatabase() {
  mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
  mongoose.set('debug', true);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', () => {
    console.log("Connected to MongoDB")

    /**
     * Test Mongoose and MongoDB
     */
    /*const user = User.findOne({username: "Ses"}, (err, user) => {
      if(err) {
        console.log(err);
      }
      console.log(user);
    });*/
  });
}


var schema = buildSchema(`
  type User {
      passwordHash: String
      username: String
      displayName: String
      previousXteas: [Int]
      x: Int
      y: Int
      height: Int
      privilege: Int
      displayMode: Int
      runEnergy: Float
      appearance: Appearance
      skills: [Skill]
      attributes: Attribute
      timers: [Timer]
      itemContainers: [ItemContainer]
      varps: [Varp]
  }

  type Appearance {
    gender: Int
    looks: [Int]
    colors: [Int]
  }

  type Skill {
    skill: Int
    xp: Float
    lvl: Int
  }

  type Attribute {
    gnomeCourse: Int,
    barbarianCourse: Int
  }

  type Timer {
    identifier: String,
    tickOffline: Boolean,
    timeLeft: Int,
    currentMs: Int
  }

  type Item {
    id: Int,
    amount: Int,
    attr: Attribute
  }

  type ItemContainer {
    name: String,
    items: [Item]
  }

  type Varp {
    id: Int,
    state: Int
  }

  type HighscoresSkill {
    skill: Int,
    xp: Float,
    lvl: Int,
    rank: Int
  }

  type Highscore {
    username: String,
    totalExperience: Float,
    totalLevel: Int,
    skills: [HighscoresSkill]
  }

  type Query {
    getUser(username: String!): User
    getUsers(skill: String, limit: Int): [User]
    getHighscore(username: String!): Highscore
    getHighscores(skill: String, limit: Int): [Highscore]
  }
`);

var root = {
    getUser: async function ({username}) {
      try {
        const user = await User.findOne({username: username});
        return user;
      } catch(err) {
        console.log(err);
        return err;
      }
    },
    getUsers: async function ({skill, limit}) {
      try {
        var query = User.find();

        if(limit) {
          query.limit(limit);
        }

        if(skill) {
          let sortBy = {totalLevel: -1, totalExperience: -1};
          if(skill != "Overall") {
            let index = skills.indexOf(skill)-1;
            sortBy = {['skills.'+index+'.xp']: -1};
          }
          query.sort(sortBy);
        }

        const users = await query.exec();
        return users;
      } catch(err) {
        console.log(err);
        return err;
      }
    },
    getHighscore: async function ({username}) {
      try {
        const highscore = await Highscores.findOne({username: username});
        return highscore;
      } catch(err) {
        console.log(err);
        return err;
      }
    },
    getHighscores: async function({skill, limit}) {
      try {
        var query = Highscores.find();

        if(limit) {
          query.limit(limit);
        }

        if(skill) {
          let sortBy = {totalLevel: -1, totalExperience: -1};
          if(skill != "Overall") {
            let index = skills.indexOf(skill)-1;
            sortBy = {['skills.'+index+'.xp']: -1};
          }
          query.sort(sortBy);
        }

        const highscores = await query.exec();
        return highscores;
      } catch(err) {
        console.log(err);
        return err;
      }
    }
  };

export {schema, root, connectToDatabase}