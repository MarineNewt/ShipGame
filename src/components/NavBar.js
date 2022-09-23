import React, { Component } from 'react'
import logo from './images/gameworks.png'

class NavBar extends Component {
  render() {
    const Mobile = window.innerWidth >= 1100 ? 'false' : 'true';
    return (
        <nav className="navbar navbar-dark fixed-top bg-dark  p-0 shadow" style={{height: 'calc(3vh + 24px)'}}>
          <div className='flex-container'>
          <div className="navbar-brand" rel="noopener noreferrer" style={{marginLeft:'10px', marginRight: 'calc(25vw - 100px)'}}>
            Ship War Game
          </div>
          {Mobile === 'false' && <p className="navbar-brand" style={{margin: 0, padding: 0,fontSize: 'calc(8px + 1.25vw)'}}> {this.props.account} </p>}
          <img className="navimage" src={logo} style={{position: 'fixed', right: '0px'}}   alt="" />
          </div>
        </nav>
    );
  }
}

export default NavBar;