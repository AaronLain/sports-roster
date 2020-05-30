import React from 'react';
import PropTypes from 'prop-types';

import './SingleTeam.scss';
import teamsData from '../../helpers/data/teamsData';
import playerData from '../../helpers/data/playerData';

import Player from '../Player/Player';
import PlayerForm from '../PlayerForm/PlayerForm';

class SingleTeam extends React.Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    setSingleTeam: PropTypes.func.isRequired,
  }

  state = {
    team: {},
    editPlayer: {},
    players: [],
    formOpen: false,
  }

  getInfo = () => {
    const { teamId } = this.props;
    teamsData.getSingleTeam(teamId)
      .then((request) => {
        const team = request.data;
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

  saveNewPlayer = (newPlayer) => {
    playerData.savePlayer(newPlayer)
      .then(() => {
        this.getInfo();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('saveNewPlayer broke', err));
  }

  putPlayer = (playerId, updatedPlayer) => {
    playerData.updatePlayer(playerId, updatedPlayer)
      .then(() => {
        this.getInfo();
        this.setState({ formOpen: false, editPlayer: {} });
      })
      .catch((err) => console.error(err, 'putPlayer broke'));
  }

  editAPlayer = (player) => {
    this.setState({ editPlayer: player, formOpen: true });
  }

  render() {
    const { setSingleTeam, teamId } = this.props;
    const {
      team,
      players,
      formOpen,
      editPlayer,
    } = this.state;

    const buildPlayers = players.map((p) => <Player key={p.id} player={p} removePlayer={this.removePlayer} editAPlayer={this.editAPlayer} />);

    return (
      <div className="SingleTeam">
        <button className="btn btn-danger" onClick={() => { setSingleTeam(''); }}>X</button>
        <h2>{team.name}</h2>
        <h3>{team.description}</h3>
        <button className="btn btn-info" onClick={() => this.setState({ formOpen: true })}>Add Player!</button>
        {formOpen ? <PlayerForm teamId={teamId} saveNewPlayer={this.saveNewPlayer} player={editPlayer} putPlayer={this.putPlayer} /> : ''}
        <div className="d-flex flex-wrap">
          {buildPlayers}
        </div>
      </div>
    );
  }
}

export default SingleTeam;
