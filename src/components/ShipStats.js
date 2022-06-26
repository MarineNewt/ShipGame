import React, { Component } from 'react'

class ShipStats extends Component {
  render() {
    return (
        <div id="content" className="mt-3" style={{textAlign:'left', border: '10px solid blue', borderRadius: '15px', padding: '5px', margin: '10px'}}>   
            <h2 className='mr-5'>SHIP STATS</h2>
            <b><p style={{border: '5px solid red', left:'0px'}}>Ship Health: {this.props.healthPoints}</p>
            <p style={{left:'0px'}}>Ship Accuracy: {this.props.accuracyPoints}</p>
            <p style={{left:'0px'}}>Ship Damage: {this.props.damagePoints}</p></b>
        </div>
    );
  }
}

export default ShipStats;