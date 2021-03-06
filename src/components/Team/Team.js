import React from 'react';
import './Team.scss';

class Team extends React.Component {
  openSingleTeamEvent = (e) => {
    e.preventDefault();
    const { team, setSingleTeam } = this.props;
    setSingleTeam(team.id);
  }

  editTeamEvent = (e) => {
    e.preventDefault();
    const { editATeam, team } = this.props;
    editATeam(team);
  }

  render() {
    const { team } = this.props;
    return (
      <div className="Team col-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{team.name}</h5>
            <p className="card-text">{team.description}</p>
            <button className="btn btn-warning" onClick={this.openSingleTeamEvent}>View Players</button>
            <button className="btn btn-warning" onClick={this.editTeamEvent}>Edit Team</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
