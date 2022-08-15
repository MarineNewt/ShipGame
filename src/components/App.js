import React, { Component } from 'react';
import Web3 from 'web3';
import sC from '../contracts/ship.json'
import bkgrd from './background.jpg'
import Main from './Main.js'
import Minter from './Minter'
import logo from './invisship.png';
import './App.css';

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    setInterval(() => {
      this.loadBlockchainData();
    }, 6000);
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId() 
    let blockNumber = await web3.eth.getBlockNumber()
    this.setState({ blockNumber: blockNumber })

    const shipContractData = sC.networks[networkId]
    if(shipContractData) {
      const shipContract = new web3.eth.Contract(sC.abi, shipContractData.address)
      this.setState({ shipContract })
      let shipContractBalance = await shipContract.methods.balanceOf(this.state.account).call()
      this.setState({ shipContractBalance: shipContractBalance.toNumber() })
      let shipContractSupply = await shipContract.methods.supplyMinted().call()
      this.setState({ shipContractSupply: shipContractSupply.toNumber() })
      let healthPoints = await shipContract.methods.checkLife(this.state.account).call()
      this.setState({ healthPoints: healthPoints.toNumber()  })
      let accuracyPoints = await shipContract.methods.checkAccy(this.state.account).call()
      this.setState({ accuracyPoints: accuracyPoints.toNumber()  })
      let damagePoints = await shipContract.methods.checkDama(this.state.account).call()
      this.setState({ damagePoints: damagePoints.toNumber()  })

      let eventfeedone = []
      let eventfeedtwo = []
      let eventfeedthree = []

      let options = {
        filter: {
            value: [],
        },
        fromBlock: blockNumber-50};
        shipContract.events.Action(options)
        .on('data', event => {  let eventfeed = event.returnValues[1].toString()
                                eventfeedone.push(eventfeed)
                                this.setState({ eventfeedone: eventfeedone })
                                let eventfeedd = event.returnValues[0].toString()
                                eventfeedtwo.push(eventfeedd)
                                this.setState({ eventfeedtwo: eventfeedtwo })
                                let eventfeeddd = event.returnValues[2].toString()
                                eventfeedthree.push(eventfeeddd)
                                this.setState({ eventfeedthree: eventfeedthree })
                                if(this.state.eventfeedone){let log = this.state.eventfeedone.length; this.setState({ log: log })}
                              })

      if(healthPoints > 0){
        let shipNumber = await shipContract.methods.findAcc(this.state.account).call()
        this.setState({ shipNumber: shipNumber.toNumber()  })
        let reloadblock = await shipContract.methods.checkRelo(this.state.account).call()
        this.setState({ reloadblock: reloadblock.toNumber()  })
        let OTSarray = await shipContract.methods.idOTS().call()
        this.setState({ OTSarray })      
        let shipOTS = OTSarray.length;
        this.setState({ shipOTS: shipOTS  })       
        }
      }
    else {
      window.alert('Please switch to the Polygon Network ')
      }

    this.setState({ loading: false })
  }

  async loadWeb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-ethereum browser detected. Metamask install is recommended.')
    }
  }

  

  mint = (vone, vtwo, vthree) => {
    const web3 = window.web3
    let stathealth = vone
    this.setState({stathealth: stathealth.toString()})
    let stataccuracy = vtwo
    this.setState({stataccuracy: stataccuracy.toString()})
    let statdamage = vthree
    this.setState({statdamage: statdamage.toString()})
    this.setState({loading: true})
    this.state.shipContract.methods.mint(stathealth,stataccuracy,statdamage).send({ from: this.state.account, value: web3.utils.toWei('1') }).on('transactionHash', (hash) => {
    this.setState({ loading: false })
  })}
  adjuststat = (stat, adjust, points) => {
    const health = this.state.stathealth
    const accuracy = this.state.stataccuracy
    const damage = this.state.statdamage
    if (adjust === 1){
      if (points === 0){return}
      if (stat === 1){this.setState({stathealth: health + 1})}
      if (stat === 2){this.setState({stataccuracy: accuracy + 1})}
      if (stat === 3){this.setState({statdamage: damage + 1})}
      }
    if (adjust === 0){
      if (stat === 1 && health > 0){this.setState({stathealth: health - 1})}
      if (stat === 2 && accuracy > 0){this.setState({stataccuracy: accuracy - 1})}
      if (stat === 3 && damage > 0){this.setState({statdamage: damage - 1})}
    }
  }

  fire = (target) => {
    this.setState({loading: true})
    this.state.shipContract.methods.fire(target).send({ from: this.state.account }).on('transactionHash', (hash) => {
    this.setState({ loading: false })
    this.setState({ internalReload: this.state.blockNumber+17 })
    var test = this.state.test
    test = test+1
    this.setState({ test: test })
    var thisinterval = setInterval(() => {
      this.loadTarget(target, test, thisinterval);
    }, 5000); 
  })}

  async loadTarget(target, int, thisinterval) {
    this.setState({ eneshipNumber: target })
    const last = int
    var test = this.state.test
    if (test !== last) {clearInterval(thisinterval)}
    const web3 = window.web3
    const networkId = await web3.eth.net.getId() 
    const shipContractData = sC.networks[networkId]
    if(shipContractData) {
      const shipContract = new web3.eth.Contract(sC.abi, shipContractData.address)
      this.setState({ shipContract })
      if (target !== this.state.lastTarget) {
        let targetEnemy = await shipContract.methods.ownerOf(target).call()
        this.setState({ targetEnemy: targetEnemy })
        this.setState({lastTarget: target})}
      let targetEnemy = this.state.targetEnemy
      let enehealthPoints = await shipContract.methods.checkLife(targetEnemy).call()
      this.setState({ enehealthPoints: enehealthPoints.toNumber()  })
      let eneaccuracyPoints = await shipContract.methods.checkAccy(targetEnemy).call()
      this.setState({ eneaccuracyPoints: eneaccuracyPoints.toNumber()  })
      let enedamagePoints = await shipContract.methods.checkDama(targetEnemy).call()
      this.setState({ enedamagePoints: enedamagePoints.toNumber()  })}
  }

  constructor(props) {
    super(props)
    this.state = {
      test: 0,
      OTSarray: [],
      eventlogone: [],
      eventlogtwo: [],
      eventlogthree: [],
      log: 0,
      account: '0x0',
      targetEnemy: '0x0',
      lastTarget: '0',
      shipContract: {},
      shipContractBalance: '0',
      shipContractSupply: '0',
      shipNumber: '0',
      healthPoints: '0',
      accuracyPoints: '0',
      damagePoints: '0',
      enehealthPoints: '0',
      eneaccuracyPoints: '0',
      enedamagePoints: '0',
      eneshipNumber: '0',
      shipOTS: '0',
      reloadblock: '0',
      internalReload: '0',
      blockNumber: '0',
      stathealth: 0,
      stataccuracy: 0,
      statdamage: 0,
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading){
      content = <h1 id="loader" className="text-center mt-5" style={{height: '100vh'}}>Loading...</h1>
    } else { 
      if (this.state.healthPoints < 1) {
      content = <Minter
      mint={this.mint}
      adjuststat={this.adjuststat}
      shipContractBalance={this.state.shipContractBalance}
      shipContractSupply={this.state.shipContractSupply}
      stathealth={this.state.stathealth}
      stataccuracy={this.state.stataccuracy}
      statdamage={this.state.statdamage}
      OTSarray={this.state.OTSarray}
      log={this.state.log}
      eventfeedone={this.state.eventfeedone}
      eventfeedtwo={this.state.eventfeedtwo}
      eventfeedthree={this.state.eventfeedthree}
      />}
      else {
      content = <Main
      mint={this.mint}
      fire={this.fire}
      adjuststat={this.adjuststat}
      shipContractBalance={this.state.shipContractBalance}
      shipContractSupply={this.state.shipContractSupply}
      blockNumber={this.state.blockNumber}
      shipNumber={this.state.shipNumber}
      healthPoints={this.state.healthPoints}
      accuracyPoints={this.state.accuracyPoints}
      damagePoints={this.state.damagePoints}
      reloadblock={this.state.reloadblock}
      internalReload={this.state.internalReload}
      enehealthPoints={this.state.enehealthPoints}
      eneaccuracyPoints={this.state.eneaccuracyPoints}
      enedamagePoints={this.state.enedamagePoints}
      eneshipNumber={this.state.eneshipNumber}
      shipOTS={this.state.shipOTS}
      OTSarray={this.state.OTSarray}
      log={this.state.log}
      eventfeedone={this.state.eventfeedone}
      eventfeedtwo={this.state.eventfeedtwo}
      eventfeedthree={this.state.eventfeedthree}
      />}
    }
    return (
      <div style={{backgroundImage: `url( ${bkgrd} )`,
      backgroundSize: 'cover'}}>
        <nav className="navbar navbar-dark fixed-top bg-dark  p-0 shadow" style={{height: '7vh'}}>
          <div className='flex-container'>
          <div
            className="navbar-brand"
            rel="noopener noreferrer"
            style={{marginLeft:'10px', marginRight: 'calc(25vw - 100px)'}}
          >
            Ship War Game
          </div>
          <small className="navbar-brand" style={{ fontSize: 'calc(8px + 1.25vw)'}}> {this.state.account} </small>
          <img src={logo} style={{position: 'fixed', right: '10px'}} height="40" width="40"  alt="" />
          </div>
        </nav>

        <div className="container-fluid" style={{marginTop: '7vh'}}>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Ship War </h1>
                {this.state.shipOTS === 1 && this.state.healthPoints > 0 && <h2 className="comp-head-sizer" style={{color: '#E3E323'}}>You are the KING of the Seas</h2>}
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;