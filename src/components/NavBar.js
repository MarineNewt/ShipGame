import React, { Component } from 'react'
import logo from './images/gameworks.png'

class NavBar extends Component {
  render() {
    return (
        <nav className="navbar navbar-dark fixed-top bg-dark  p-0 shadow" style={{height: 'calc(3vh + 24px)'}}>
          <div className='flex-container'>
          <div className="navbar-brand" rel="noopener noreferrer" style={{marginLeft:'10px', marginRight: 'calc(25vw - 100px)'}}>
            Ship War Game
          </div>
          <small className="navbar-brand" style={{ fontSize: 'calc(8px + 1.25vw)'}}> {this.props.account} </small>
          <img className="navimage" src={logo} style={{position: 'fixed', right: '10px'}}   alt="" />
          </div>
        </nav>
    );
  }
}

export default NavBar;