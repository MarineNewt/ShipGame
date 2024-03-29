import React, { Component } from 'react'

class ShipStats extends Component {
  render() {
    return (
        <div id="content" className="mt-3 compbox comp-font-sizer" style={{textAlign:'left'}}>   
            <h2 className='mr-5 comp-head-sizer'>SHIP STATS</h2>
            <b><p style={{border: '5px solid red', borderRadius: '3px', left:'0px'}}>Ship Health: {this.props.healthPoints}</p>
            <p style={{left:'0px'}}>Ship Accuracy: {this.props.accuracyPoints}</p>
            <p style={{left:'0px'}}>Ship Damage: {this.props.damagePoints}</p>
            <p style={{textAlign:'center', fontSize: 'calc(.7vw + 10px)'}}>Ship# {this.props.shipNumber}</p></b>
        </div>
    );
  }
}

export default ShipStats;