import React, { Component } from 'react'
import matictoken from './images/matic.png';

class MaticInfo extends Component {
  render() {
    return (
        <div id="content" className="compbox" style={{textAlign:'left', marginTop: '5vh', color: '', borderBlockColor: 'pink', width: '22vw'}}>   
            <h2 className='' style={{fontSize: '2.5vw'}}>Don't have Matic?</h2>
            <p> Click the icon below to visit sushiswap and get Matic</p>
            <div style={{width: 'auto', height: 'auto', textAlign:'center', whiteSpace: 'pre-wrap', overflowWrap:'visible'}}>
            <a href='https://app.sushi.com/swap?tokens=0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619&tokens=MATIC&chainId=137'><img style={{borderRadius: '50%', height: '5vw'}} src={matictoken} alt="matic"></img></a>
            </div>
            
        </div>
    );
  }
}

export default MaticInfo;