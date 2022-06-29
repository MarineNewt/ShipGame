import React, { Component } from 'react'
import ShipStats from './ShipStats'
import TargetStats from './TargetStats'
import shipImage from './invisship.png'


class Main extends Component {
  render() {
    let stats
    let targetstats
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
    return (
      <div id="content" className="mt-3"> 
        <div style={{left: '20px', position: 'absolute'}}>{stats}</div> 
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
          <br></br>
          <a href="https://polygonscan.com/token/0xc2bb98b0b3f9220d49e008b9e764d81f5a3ae422#inventory">Find a target</a>
        </div> 
      </div>
    );
  }
}

export default Main;
