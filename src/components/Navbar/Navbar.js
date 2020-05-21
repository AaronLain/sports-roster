import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Navbar.scss';

class Navbar extends React.Component {
  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    const { authed } = this.props;
    return (
      <div className="Navbar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="">Sports Roster!</a>
          {
            authed
              ? <button className="btn btn-danger ml-auto" onClick={this.logMeOut}>Logout</button>
              : <button className="btn btn-warning ml-auto" onClick={this.loginClickEvent}>GOOGLE</button>
          }
        </nav>
      </div>
    );
  }
}

export default Navbar;
