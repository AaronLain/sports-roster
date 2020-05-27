import React from 'react';
import PropTypes from 'prop-types';

import './TeamContainer.scss';

import teamsData from '../../helpers/data/teamsData';
import authData from '../../helpers/data/authData';
import TeamForm from '../TeamForm/TeamForm';

import Team from '../Team/Team';

class TeamContainer extends React.Component {
  static propTypes = {
    setSingleTeam: PropTypes.func.isRequired,
  }

  state = {
    teams: [],
    formOpen: false,
  }

  getAllTeams = () => {
    teamsData.getTeamsByUid(authData.getUid())
      .then((teams) => this.setState({ teams }))
      .catch((err) => console.error('get Teams brok', err));
  }

  componentDidMount() {
    this.getAllTeams();
  }

  saveNewTeam = (newTeam) => {
    teamsData.saveTeam(newTeam)
      .then(() => {
        this.getAllTeams();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('saveNewTeam broke', err));
  }

  render() {
    const { teams, formOpen } = this.state;
    const { setSingleTeam } = this.props;

    const makeTeams = teams.map((team) => <Team key={team.id} team={team} setSingleTeam={setSingleTeam} />);

    return (
      <div className="TeamContainer">
        <h2>Chess Teams</h2>
        <button className="btn btn-info" onClick={() => this.setState({ formOpen: true })}>+</button>
        { formOpen ? <TeamForm saveNewTeam={this.saveNewTeam}/> : '' }
        <div className="d-flex flex-wrap">
          {makeTeams}
        </div>
      </div>
    );
  }
}

export default TeamContainer;
