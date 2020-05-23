import React from 'react';

import './TeamContainer.scss';

import teamsData from '../../helpers/data/teamsData';
import authData from '../../helpers/data/authData';

import Team from '../Team/Team';

class TeamContainer extends React.Component {
  state = {
    teams: [],
  }

  componentDidMount() {
    teamsData.getTeamsByUid(authData.getUid())
      .then((teams) => this.setState({ teams }))
      .catch((err) => console.error('get Teams brok', err));
  }

  render() {
    const { teams } = this.state;
    // const { setSingleTeam } = this.props;

    const makeTeams = teams.map((team) => <Team key={team.id} team={team}/>);

    return (
      <div className="TeamContainer">
        <h2>Teams</h2>
        <div className="d-flex flex-wrap">
          {makeTeams}
        </div>
      </div>
    );
  }
}

export default TeamContainer;
