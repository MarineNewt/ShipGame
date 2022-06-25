import React, { Component } from 'react'
import shipImage from './shipic.jpg'

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">
      {this.props.shipContractBalance === 0 && <h1>You currently do not have a ship</h1>}
      {this.props.shipContractBalance === 0 && <form className="mb-0" onSubmit={(event) => {
                    event.preventDefault()
                    this.props.mint()
                }}>
                  <br></br><br></br>
                   
                   <button type="submit" className="btn btn-primary btn-block btn-lg mb-3" style = {{color: "white", backgroundColor: "blue"}} >Mint a Ship</button>
              </form>}
          
              {this.props.shipContractBalance === 1 &&  
               <div className='text-left text-success' style={{ float: 'right', fontSize: 20, fontFamily: 'Times New Roman' }}>
                <img src={shipImage
              } alt="Tree" height='300' style={{ float: 'center' }}/>
                <p className='mt-5 mb-1' style = {{color: "black"}}>Current Ship Health: {this.props.healthPoints} </p>

                <form className="mb-3" onSubmit={(event) => {
                    event.preventDefault()
                    let target
                    target = this.input.value.toString()
                    this.props.fire(target)
                }}>
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
                <a href="https://opensea.io/collection/tanks-v4-3">Find a target</a>
              </div> }

      </div>
    );
  }
}

export default Main;
