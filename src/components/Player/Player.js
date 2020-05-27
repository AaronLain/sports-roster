import React from 'react';
import './Player.scss';

class Player extends React.Component {
  deletePlayerEvent = (e) => {
    e.preventDefault();
    const { player, removePlayer } = this.props;
    removePlayer(player.id);
  }

  render() {
    const { player } = this.props;

    return (
      <div className="Player col-3">
        <div className="card">
          <img className="card-img-top" src={player.imageUrl} alt="pin" />
          <div className="card-body">
            <h5 className="card-title">{player.name}</h5>
            <button className="btn btn-warning" onClick={this.deletePlayerEvent} >Delete!</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
