import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Navbar.scss';

class Navbar extends React.Component {
  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="Navbar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="">Sports Roster!</a>
          <button className="btn btn-danger ml-auto" onClick={this.logMeOut}>Logout</button>
        </nav>
      </div>
    );
  }
}

export default Navbar;
