import React, { Component } from 'react'
import ShipStats from './ShipStats'
import shipImage from './shipic.jpg'

class Main extends Component {
  render() {
    let stats
    stats = <ShipStats
    healthPoints={this.props.healthPoints}
    accuracyPoints={this.props.accuracyPoints}
    damagePoints={this.props.damagePoints}
    />
    return (
      <div id="content" className="mt-3"> 
        <div style={{left: '20px', position: 'absolute'}}>{stats}</div> 
        <div className='text-left text-success' style={{ float: 'right', fontSize: 20, fontFamily: 'Times New Roman' }}>
          <img src={shipImage} alt="Tree" height='300' style={{ float: 'center' }}/>
          <form className="mb-3" onSubmit={(event) => {
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
                placeholder="00"
                required />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg" style = {{color: "black", backgroundColor: "red"}} >FIRE</button>
          </form>
          <br></br>
          <a href="https://polygonscan.com/token/0x84c164c618ddc23aeb4be3a3f886d629d607447b#inventory">Find a target</a>
        </div> 
      </div>
    );
  }
}

export default Main;
