import React from 'react';
import PropTypes from 'prop-types';

import './TeamForm.scss';

import authData from '../../helpers/data/authData';

class TeamForm extends React.Component {
  static propTypes = {
    saveNewTeam: PropTypes.func.isRequired,
  }

  state = {
    teamName: '',
    teamDescription: '',
  }

  saveTeam = (e) => {
    e.preventDefault();
    const { teamDescription, teamName } = this.state;
    const { saveNewTeam } = this.props;
    const newTeam = {
      description: teamDescription,
      name: teamName,
      uid: authData.getUid(),
    };
    saveNewTeam(newTeam);
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ teamName: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ teamDescription: e.target.value });
  }

  render() {
    const { teamDescription, teamName } = this.state;
    return (
      <div className="TeamForm">
        <form className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="team-name">Name</label>
            <input
              type="text"
              className="form-control"
              id="team-name"
              placeholder="Jim"
              value={teamName}
              onChange={this.nameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="team-description">Description</label>
            <input
              type="text"
              className="form-control"
              id="team-description"
              placeholder="really nice description"
              value={teamDescription}
              onChange={this.descriptionChange}
            />
          </div>
          <button className="btn btn-dark" onClick={this.saveTeam}>Save Team</button>
        </form>
      </div>
    );
  }
}

export default TeamForm;
