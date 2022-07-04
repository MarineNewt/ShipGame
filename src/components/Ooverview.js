import React, { Component } from 'react'

class Ooverview extends Component {
  render() {
    return (
        <div id="content" className="mt-3" style={{textAlign:'left', border: '10px solid blue', borderRadius: '15px', padding: '5px', margin: '10px'}}>   
            <h2 className=''>Ocean Overview</h2>
            <b><div style={{width: '220px', textAlign:'center', whiteSpace: 'pre-wrap', overflowWrap:'visible'}}>
              <p>Ships at sea: {this.props.shipOTS}</p>
              <p>{this.props.OTSarray.toString()}</p>
            </div></b>
            
        </div>
    );
  }
}

export default Ooverview;