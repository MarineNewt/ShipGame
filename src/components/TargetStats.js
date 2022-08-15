import React, { Component } from 'react'

class TargetStats extends Component {
  render() {
    return (
        <div id="content" className="mt-3 compbox comp-font-sizer" style={{textAlign:'right'}}>   
            {this.props.enehealthPoints >= 1 && <div><h2 className='mr-5 comp-head-sizer'>Target Stats</h2>
            <b><p style={{border: '5px solid red', left:'0px'}}>Ship Health: {this.props.enehealthPoints}</p>
            <p style={{left:'0px'}}>Ship Accuracy: {this.props.eneaccuracyPoints}</p>
            <p style={{left:'0px'}}>Ship Damage: {this.props.enedamagePoints}</p>
            <p style={{textAlign:'center'}}>Ship# {this.props.eneshipNumber}</p></b></div>}

            
            {this.props.enehealthPoints < 1 &&<div style={{textAlign:'center', color:'red'}}><b><h2>Ship {this.props.eneshipNumber}</h2>
            <h3 className="comp-head-sizer">has been SUNK</h3></b></div>}
        </div>
        
    );
  }
}

export default TargetStats;