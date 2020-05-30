import React from 'react';
import PropTypes from 'prop-types';

import './PlayerForm.scss';
import authData from '../../helpers/data/authData';

class PlayerForm extends React.Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    saveNewPlayer: PropTypes.func.isRequired,
    putPlayer: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
  }

  state = {
    playerName: '',
    playerImageUrl: '',
    isEditing: false,
  }

  componentDidMount() {
    const { player } = this.props;
    if (player.name) {
      this.setState({ playerName: player.name, playerImageUrl: player.imageUrl, isEditing: true });
    }
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ playerName: e.target.value });
  }

  imageUrlChange = (e) => {
    e.preventDefault();
    this.setState({ playerImageUrl: e.target.value });
  }

  savePlayer = (e) => {
    e.preventDefault();
    const { playerImageUrl, playerName } = this.state;
    const { teamId, saveNewPlayer } = this.props;
    const newPlayer = {
      teamId,
      imageUrl: playerImageUrl,
      name: playerName,
      uid: authData.getUid(),
    };
    saveNewPlayer(newPlayer);
  }

  updatePlayer = (e) => {
    e.preventDefault();
    const { playerImageUrl, playerName } = this.state;
    const { teamId, putPlayer, player } = this.props;
    const updatedPlayer = {
      teamId,
      imageUrl: playerImageUrl,
      name: playerName,
      uid: authData.getUid(),
    };
    putPlayer(player.id, updatedPlayer);
  }

  render() {
    const { playerImageUrl, playerName, isEditing } = this.state;
    return (
      <div className="PlayerForm">
      <form className="col-6 offset-3">
        <div className="form-group">
          <label htmlFor="player-name">Name</label>
          <input
            type="text"
            className="form-control"
            id="player-name"
            placeholder="Jamey with an -ey"
            value={playerName}
            onChange={this.nameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="player-image-url">Image Url</label>
          <input
          type="text"
          className="form-control"
          id="player-image-url"
          placeholder="www.myimageurl.something"
          value={playerImageUrl}
          onChange={this.imageUrlChange}
        />
          </div>
          {
            isEditing
              ? <button className="btn btn-primary" onClick={this.updatePlayer}>Update Player!</button>
              : <button className="btn btn-primary" onClick={this.savePlayer}>Save New Player!</button>
          }
      </form>
    </div>
    );
  }
}

export default PlayerForm;
