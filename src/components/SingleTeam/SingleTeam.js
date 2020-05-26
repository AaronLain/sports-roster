import React from 'react';

import './SingleTeam.scss';
import teamsData from '../../helpers/data/teamsData';
import playerData from '../../helpers/data/playerData';

import Player from '../Player/Player';

class SingleTeam extends React.Component {
  state = {
    team: {},
    players: [],
  }

  getInfo = () => {
    const { teamId } = this.props;
    teamsData.getTeamsByUid(teamId)
      .then((request) => {
        const team = request.data;
        console.error(team, 'team');
        this.setState({ team });
        playerData.getPlayersByTeamId(teamId)
          .then((players) => this.setState({ players }));
      }).catch((err) => console.error('Single team broke', err));
  }

  componentDidMount() {
    this.getInfo();
  }

  removePlayer = (playerId) => {
    playerData.deletePlayer(playerId)
      .then(() => this.getInfo())
      .catch((err) => console.error(err));
  }

  render() {
    const { setSingleTeam } = this.props;
    const { team, players } = this.state;

    const buildPlayers = players.map((p) => <Player key={p.id} player={p} removePlayer={this.removePlayer}/>);

    return (
      <div className="SingleTeam">
        <button className="btn btn-danger" onClick={() => { setSingleTeam(''); }}>X</button>
        {/* <h2>{team.name}</h2>
        <h3>{team.description}</h3> */}
        <div className="d-flex flex-wrap">
        {buildPlayers}
        </div>
      </div>
    );
  }
}

export default SingleTeam;
