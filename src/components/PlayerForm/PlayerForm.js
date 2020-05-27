import React from 'react';
import PropTypes from 'prop-types';

import './PlayerForm.scss';
import authData from '../../helpers/data/authData';

class PlayerForm extends React.Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    saveNewPlayer: PropTypes.func.isRequired,
  }

  state = {
    playerName: '',
    playerImageUrl: '',
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

  render() {
    const { playerImageUrl, playerName } = this.state;
    return (
      <div className="PinForm">
      <form className="col-6 offset-3">
        <div className="form-group">
          <label htmlFor="pin-name">Name</label>
          <input
            type="text"
            className="form-control"
            id="pin-name"
            placeholder="Big Cat"
            value={playerName}
            onChange={this.nameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pin-image-url">Image Url</label>
          <input
          type="text"
          className="form-control"
          id="pin-image-url"
          placeholder="www.google.com"
          value={playerImageUrl}
          onChange={this.imageUrlChange}
        />
        </div>
        <button className="btn btn-primary" onClick={this.savePlayer}>Save Player!</button>
      </form>
    </div>
    );
  }
}

export default PlayerForm;
