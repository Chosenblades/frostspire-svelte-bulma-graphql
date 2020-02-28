//Our query for the player's data
export function getHighscore(username) {
    return `{
        getHighscore(username:"${username}") {
            username
            totalLevel
            totalExperience
            skills {
                xp
                lvl
                rank
            }
        }
    }`
}

//Our query for the default data on main table
export function getHighscores(skill, limit) {
    return `{
        getHighscores(${skill ? 'skill:"'+skill+'"' : ''}${limit ? 'limit:'+limit : ''}) {
            username
            totalLevel
            totalExperience
            skills {
                xp
                lvl
                rank
            }
        }
    }`
}

//Our query for the default data on main table
export function getUsers(skill, limit) {
    return `{
        getUsers(${skill ? 'skill:"'+skill+'"' : ''}${limit ? 'limit:'+limit : ''}) {
            username
            totalLevel
            totalExperience
            skills {
                xp
                lvl
            }
        }
    }`
}

//Our query for the player's data
export function getUser(username) {
    return `{
        getUser(username:"${username}") {
            username
            totalLevel
            totalExperience
            skills {
                xp
                lvl
            }
        }
    }`
}

export function query(query) {
    return fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query})
        }).catch((error) => {
            console.log("EROROROROR");
        });
}

export async function getRank(username, skill) {
    const res = await query(getUsers(skill, 10000));
    const response = await res.json();

    if (res.status !== 200) {
        console.log("fetch was not successful");
        return;
    } else {
        if(response.data.getUsers == null) {
            console.log("Error occurred");
            return;
        }

        let players = response.data.getUsers;
        const index = players.findIndex(item => item.username === username);
        console.log(`Skill: ${skill}  Rank: ${index+1}`);
        return index+1;
    }
}