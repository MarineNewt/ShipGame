import React, { Component } from 'react'

class ActivityFeed extends Component {
  render() {
    return (
        <div id="content" className="compbox" style={{textAlign:'left', marginTop: '5vh', color: ''}}>   
            <h2 className=''>Latest Ocean Activity...</h2>
            <div style={{width: 'auto', height: 'auto', textAlign:'center', whiteSpace: 'pre-wrap', overflowWrap:'visible'}}>
              {Boolean(this.props.log >= 1) && <p>Ship {this.props.eventfeedone[(this.props.log)-1]} has {this.props.eventfeedtwo[(this.props.log)-1]} ship {this.props.eventfeedthree[(this.props.log)-1]}</p>}
              {Boolean(this.props.log >= 2) && <p>Ship {this.props.eventfeedone[(this.props.log)-2]} has {this.props.eventfeedtwo[(this.props.log)-2]} ship {this.props.eventfeedthree[(this.props.log)-2]}</p>}
              {Boolean(this.props.log >= 3) && <p>Ship {this.props.eventfeedone[(this.props.log)-3]} has {this.props.eventfeedtwo[(this.props.log)-3]} ship {this.props.eventfeedthree[(this.props.log)-3]}</p>}
              {Boolean(this.props.log >= 4) && <p>Ship {this.props.eventfeedone[(this.props.log)-4]} has {this.props.eventfeedtwo[(this.props.log)-4]} ship {this.props.eventfeedthree[(this.props.log)-4]}</p>}
              {Boolean(this.props.log >= 5) && <p>Ship {this.props.eventfeedone[(this.props.log)-5]} has {this.props.eventfeedtwo[(this.props.log)-5]} ship {this.props.eventfeedthree[(this.props.log)-5]}</p>}
            </div>
            
        </div>
    );
  }
}

export default ActivityFeed;