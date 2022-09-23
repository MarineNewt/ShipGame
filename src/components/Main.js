import React, { Component } from 'react'
import ShipStats from './ShipStats'
import TargetStats from './TargetStats'
import Ooverview from './Ooverview'
import ActivityFeed from './ActivityFeed'
import shipImage from './images/invisship.png'

class Main extends Component {
  render() {
    const Mobile = window.innerWidth >= 1100 ? 'false' : 'true';
    let stats
    let targetstats
    let oceanoverview
    let activityfeed
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
    activityfeed = <ActivityFeed
    eventfeedone={this.props.eventfeedone}
    eventfeedtwo={this.props.eventfeedtwo}
    eventfeedthree={this.props.eventfeedthree}
    log={this.props.log}
    />
    return (
      <div id="content" className="mt-3" style={{align: 'center', height: '130vh'}}> 
        <div style={{left: '2vw', top: '4vh', position: 'absolute'}}>{stats}</div> 
        {Mobile === 'false' && <div style={{left: '2vw', top: 'calc(110vh - 25vw)', position: 'absolute'}}>{oceanoverview}</div> }
        {Mobile === 'true' && <div style={{left: '2vw', top: 'calc(110vh)', position: 'absolute'}}>{oceanoverview}</div> }
        {this.props.eneaccuracyPoints > 0 && <div style={{right: '2vw', top: '4vh', position: 'absolute'}}>{targetstats}</div>}
        <div className='' style={{fontSize: 20, fontFamily: 'Times New Roman' }}>
          <img src={shipImage} alt="Tree" className="mb-4" style={{ float: 'center', height: '25vw'}}/>
          {this.props.reloadblock <= this.props.blockNumber && this.props.internalReload <= this.props.blockNumber && <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            let target
            target = this.input.value.toString()
            this.props.fire(target)}}>
            <div>
              {Mobile === 'true' && <br></br>}
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
          {(this.props.reloadblock > this.props.blockNumber || this.props.internalReload > this.props.blockNumber) && <div style={{color: 'black', textAlign: 'center', border: '5px solid black', marginBottom: '7vh'}}>
          <p>Your ship is reloading its cannons!</p>
          <p>Prepare for your next shot</p></div>}
          {activityfeed}
        </div> 
      </div>
    );
  }
}

export default Main;
