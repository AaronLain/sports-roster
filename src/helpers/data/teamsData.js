import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getTeamsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/team.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allTeamsObj = result.data;
      const teams = [];
      if (allTeamsObj !== null) {
        Object.keys(allTeamsObj).forEach((teamId) => {
          const newTeam = allTeamsObj[teamId];
          newTeam.id = teamId;
          teams.push(newTeam);
        });
      }
      resolve(teams);
    })
    .catch((err) => reject(err));
});

export default { getTeamsByUid };
