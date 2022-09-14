import React, { Component } from 'react'
import icon from './images/shipinfoicon.png'

class GameInfo extends Component {
  render() {
    return (
        <div id="content" className="compbox" style={{textAlign:'left', marginTop: '5vh', color: '', borderBlockColor: 'blue', width: '22vw'}}>   
            <h2 className='' style={{fontSize: '2.5vw'}}>New to Ship Wars?</h2>
            <p> Click the icon below to learn more</p>
            <div style={{width: 'auto', height: 'auto', textAlign:'center', whiteSpace: 'pre-wrap', overflowWrap:'visible'}}>
            <a href='/info'><img style={{borderRadius: '20%', height: '5vw'}} src={icon} alt="info"></img></a>
            </div>
            
        </div>
    );
  }
}

export default GameInfo;