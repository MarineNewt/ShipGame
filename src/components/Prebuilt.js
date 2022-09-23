import React, { Component } from 'react'
import ship2 from './images/ship2.png'
import ship3 from './images/ship3.png'
import ship4 from './images/ship4.png'

class Prebuilt extends Component {
  render() {
    return (
        <div id="content" className="compbox" style={{textAlign:'left', marginTop: '5vh', color: '', borderBlockColor: 'Yellow', width: '20vw'}}>    
            <h2 className='mr-5 comp-head-sizer'>Quick Class</h2>
            <br></br>
            <div style={{textAlign: 'center', fontSize: 'calc(1.7vw + 7px)', fontStyle: 'oblique'}}>
                <button className='nopad' onClick={(event) => {event.preventDefault(); this.props.quickclass(1)}} style={{borderRadius: '20%'}}><img style={{borderRadius: '20%', height: '5vw'}} src={ship2} alt="info"></img></button>
                <p className='mb-3' style={{}}>Surefire</p>
                <button className='nopad' onClick={(event) => {event.preventDefault(); this.props.quickclass(2)}} style={{borderRadius: '20%'}}><img style={{borderRadius: '20%', height: '5vw'}} src={ship4} alt="info"></img></button>
                <p className='mb-3' style={{}}>Destroyer</p>
                <button className='nopad' onClick={(event) => {event.preventDefault(); this.props.quickclass(3)}} style={{borderRadius: '20%'}}><img style={{borderRadius: '20%', height: '5vw'}} src={ship3} alt="info"></img></button>
                <p style={{}}>Titan</p>
            </div>
        </div>
    );
  }
}

export default Prebuilt;