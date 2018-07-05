const axios = require('axios');

const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;

// ES5 Version
// function getProfile(username) {
//   return axios.get('https://api.github.com/users/' + username + params)
//     .then(function ( user ){
//       return user.data;
//     });
// }

// ES6 Version
function getProfile (username) {
  return axios.get(`https://api.github.com/users/${username}${params}`)
    .then(({data}) => data);
}

function getRepos (username) {
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
}

function getStarCount(repos) {
  return repos.data.reduce((count, { stargazers_count}) => { count + stargazers_count}, 0);
}

// ES5 Version
// function calculateScore (profile, repos) {
//   var followers = profile.followers;
//   var totalStars = getStarCount(repos);
//   return (followers * 3) + totalStars;
// }

// ES6 Version
function calculateScore ({followers}, repos) {
  return (followers * 3) + getStarCount(repos);
}

function handleError (error) {
  console.warn(error);
  return null;
}

// ES5 Version
// function getUserData (player) {
//   return axios.all([
//     getProfile(player),
//     getRepos(player)
//   ]).then(function ( data) {
//     var profile = data[0];
//     var repos = data[1];

//     return { 
//       profile: profile, 
//       score: calculateScore(profile, repos)
//     }
//   });
// }

function getUserData (player) {
  return Promise.all([
    getProfile(player),
    getRepos(player)
  ]).then(([profile, repos]) => ({
      profile,
      score: calculateScore(profile, repos)
  }))
}

function sortPlayers (players) {
  return players.sort((a,b) => { b.score - a.score;});
}

module.exports = {
  battle: (players) => {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },
  fetchPopularRepos: (language) => {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:$[language}&sort=stars&order=desc&type=Repositories`);

    return axios.get(encodedURI)
      .then((response) => {
        return response.data.items;
      });
  }
};