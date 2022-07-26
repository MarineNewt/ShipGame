import React, { Component } from 'react'

class Minter extends Component {
  render() {
    let statpoints = (5 - this.props.stathealth - this.props.stataccuracy - this.props.statdamage)
    return (
      <div id="content" className="mt-3 mb-5" >
      <div><h1>You currently do not have a ship</h1><br></br><br></br></div>
      <div className="compbox">
                    <p>Pick Stats for your ship: {statpoints}</p>
                    <div className='btn btn-block btn-med' style = {{}}>
                      <p style = {{fontSize: '50px'}}>{this.props.stathealth}  -  {this.props.stataccuracy}  -  {this.props.statdamage}</p>
                      <button onClick={(event) => {event.preventDefault()
                        this.props.adjuststat(1, 1, statpoints)}} style = {{backgroundColor: 'lime'}}>+ Health</button>
                      <button onClick={(event) => {event.preventDefault()
                        this.props.adjuststat(2, 1, statpoints)}} style = {{backgroundColor: 'lime'}}>+ Accuracy</button>
                      <button onClick={(event) => {event.preventDefault()
                        this.props.adjuststat(3, 1, statpoints)}} style = {{backgroundColor: 'lime'}}>+ Damage</button></div>
                    <div className='btn btn-block btn-med'>
                      <button onClick={(event) => {event.preventDefault()
                        this.props.adjuststat(1, 0, statpoints)}} style = {{backgroundColor: 'red'}}>- Health</button>
                      <button onClick={(event) => {event.preventDefault()
                        this.props.adjuststat(2, 0, statpoints)}} style = {{backgroundColor: 'red'}}>- Accuracy</button>
                      <button onClick={(event) => {event.preventDefault()
                        this.props.adjuststat(3, 0, statpoints)}} style = {{backgroundColor: 'red'}}>- Damage</button></div>
                   </div>
                <form className="mb-0" onSubmit={(event) => {
                    event.preventDefault()
                    this.props.mint(this.props.stathealth, this.props.stataccuracy, this.props.statdamage)}}>
                   <button type="submit" className="btn btn-primary btn-block btn-lg mb-3" style = {{color: "white", backgroundColor: "black"}} >Mint a Ship</button>
                </form>              
              </div>
    );
  }
}

export default Minter;