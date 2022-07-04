import React, { Component } from 'react'
import ShipStats from './ShipStats'
import TargetStats from './TargetStats'
import Ooverview from './Ooverview'
import shipImage from './invisship.png'

class Main extends Component {
  render() {
    let stats
    let targetstats
    let oceanoverview
    stats = <ShipStats
    shipNumber={this.props.shipNumber}
    healthPoints={this.props.healthPoints}
    accuracyPoints={this.props.accuracyPoints}
    damagePoints={this.props.damagePoints}
    />
    targetstats = <TargetStats 
    enehealthPoints={this.props.enehealthPoints}
    eneaccuracyPoints={this.props.eneaccuracyPoints}
    enedamagePoints={this.props.enedamagePoints}
    eneshipNumber={this.props.eneshipNumber}
    />
    oceanoverview = <Ooverview
    OTSarray={this.props.OTSarray}
    enehealthPoints={this.props.enehealthPoints}
    shipOTS={this.props.shipOTS}
    />
    return (
      <div id="content" className="mt-3"> 
        <div style={{left: '20px', top: '20px', position: 'absolute'}}>{stats}</div> 
        <div style={{left: '20px', top: '300px', position: 'absolute'}}>{oceanoverview}</div> 
        {this.props.eneaccuracyPoints > 0 && <div style={{right: '20px', position: 'absolute'}}>{targetstats}</div>}
        <div className='text-left text-success' style={{ float: 'right', fontSize: 20, fontFamily: 'Times New Roman' }}>
          <img src={shipImage} alt="Tree" height='300' className="mb-4" style={{ float: 'center' }}/>
          {this.props.reloadblock <= this.props.blockNumber && this.props.internalReload <= this.props.blockNumber && <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            let target
            target = this.input.value.toString()
            this.props.fire(target)}}>
            <div>

              <h2 className="float-left"  style = {{color: "black"}} ><b>Enter your target enemy</b></h2>
              <br></br>
              <input
                type="text"
                ref={(input) =>  { this.input = input }}
                className="form-control form-control-lg"
                placeholder="0"
                required />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg" style = {{color: "black", backgroundColor: "red"}} >FIRE</button>
          </form>} 
          {(this.props.reloadblock > this.props.blockNumber || this.props.internalReload > this.props.blockNumber) && <div style={{color: 'black', textAlign: 'center', border: '5px solid black'}}>
          <p>Your ship is reloading its cannons!</p>
          <p>Prepare for your next shot</p></div>}
        </div> 
      </div>
    );
  }
}

export default Main;
