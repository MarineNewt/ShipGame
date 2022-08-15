import React, { Component } from 'react'

class Ooverview extends Component {
  render() {
    return (
        <div id="content" className="mt-3 compbox comp-font-sizer" style={{textAlign:'left', }}>   
            <h2 className='comp-head-sizer'>Ocean Overview</h2>
            <b><div style={{width: '220px', textAlign:'center', whiteSpace: 'pre-wrap', overflowWrap:'visible'}}>
              <p>Ships at sea: {this.props.shipOTS}</p>
              <p>{this.props.OTSarray.toString()}</p>
            </div></b>
            
        </div>
    );
  }
}

export default Ooverview;