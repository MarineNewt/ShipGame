import React, { Component } from 'react';
import {BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Web3 from 'web3';
import sC from '../contracts/ship.json';
import bkgrd from './images//background.jpg';
import discord from './images/discord.png'
import twitter from './images/twitter.png'
import Main from './Main.js';
import Minter from './Minter';
import NavBar from './NavBar.js';
import InfoPage from './GameInfoPage.js';
import TosPage from './TermsOfService.js';
import OwnerPage from './Owner.js';
import './App.css';

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    setInterval(() => {
      this.loadBlockchainData();
    }, 4800);
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
      let allstat = await shipContract.methods.checkall(this.state.account).call()
      this.setState({ healthPoints: allstat[0]  })
      this.setState({ accuracyPoints: allstat[1] })
      this.setState({ damagePoints: allstat[2]  })

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

      if(this.state.healthPoints > 0){
        let shipNumber = await shipContract.methods.findAcc(this.state.account).call()
        this.setState({ shipNumber: shipNumber  })
        this.setState({ reloadblock: allstat[3]  })
        let OTSarray = await shipContract.methods.idOTS().call()
        this.setState({ OTSarray })      
        this.setState({ shipOTS: OTSarray.length  })       
        }
      }
    else {
      if(!this.state.notified){window.alert('Please switch to the Polygon Network ')}
      this.setState({notified: true})
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
    this.setState({loading: true})
    this.state.shipContract.methods.mint(vone,vtwo,vthree).send({ from: this.state.account, value: web3.utils.toWei('1'), gas: 350000, maxFeePerGas: 100000000000, maxPriorityFeePerGas: 36100000000, }).on('transactionHash', (hash) => {
    this.setState({ loading: false })
  })}

  adjuststat = (stat, adjust, points) => {
    if (adjust === 1){
      if (points === 0){return}
      if (stat === 1){this.setState({stathealth: this.state.stathealth + 1})}
      if (stat === 2){this.setState({stataccuracy: this.state.stataccuracy + 1})}
      if (stat === 3){this.setState({statdamage: this.state.statdamage + 1})}
      }
    if (adjust === 0){
      if (stat === 1 && this.state.stathealth > 0){this.setState({stathealth: this.state.stathealth - 1})}
      if (stat === 2 && this.state.stataccuracy > 0){this.setState({stataccuracy: this.state.stataccuracy - 1})}
      if (stat === 3 && this.state.statdamage > 0){this.setState({statdamage: this.state.statdamage - 1})}
    }
  }
  quickclass = (ship) => {
    if (ship === 1){
      this.setState({stathealth: 0})
      this.setState({stataccuracy: 3})
      this.setState({statdamage: 2})
    }
    if (ship === 2){
      this.setState({stathealth: 1})
      this.setState({stataccuracy: 1})
      this.setState({statdamage: 3})
    }
    if (ship === 3){
      this.setState({stathealth: 4})
      this.setState({stataccuracy: 0})
      this.setState({statdamage: 1})
    }
  }

  firescope = (target, type) => {
    if (type === 1) {
      this.setState({loading: true})
      this.state.shipContract.methods.fire(target).send({ from: this.state.account, gas: 150000, maxFeePerGas: 200000000000, maxPriorityFeePerGas: 36100000000,}).on('transactionHash', (hash) => {
      this.setState({ loading: false })
      this.setState({ internalReload: this.state.blockNumber+17 })})}
    
    var next = this.state.next
    next = next+1
    this.setState({ next: next })
    var thisinterval = setInterval(() => {
      this.loadTarget(target, next, thisinterval);
    }, 4500); 
  }

  async loadTarget(target, int, thisinterval) {
    this.setState({ eneshipNumber: target })
    const last = int
    var next = this.state.next
    if (next !== last) {clearInterval(thisinterval)}
    const web3 = window.web3
    const networkId = await web3.eth.net.getId() 
    const shipContractData = sC.networks[networkId]
    if(shipContractData) {
      const shipContract = new web3.eth.Contract(sC.abi, shipContractData.address)
      this.setState({ shipContract })
      if (target !== this.state.lastTarget) {
        let alivecheck = await shipContract.methods.checkIfTokenExist(target).call()
        this.setState({ alivecheck: alivecheck })
        if (alivecheck === '1') {
          let targetEnemy = await shipContract.methods.ownerOf(target).call()
          this.setState({ targetEnemy: targetEnemy })}}
      let alivecheck = this.state.alivecheck
      if (alivecheck === '1') {
        let allstat = await shipContract.methods.checkall(this.state.targetEnemy).call()
        this.setState({ enehealthPoints: allstat[0]  })
        this.setState({ eneaccuracyPoints: allstat[1] })
        this.setState({ enedamagePoints: allstat[2]  })
      }
      else {
        this.setState({ enehealthPoints: 0  })
        this.setState({ eneaccuracyPoints: 1 })
        this.setState({ enedamagePoints: 0  })
      }
      }
  }

  constructor(props) {
    super(props)
    this.state = {
      OTSarray: [],
      eventlogone: [],
      eventlogtwo: [],
      eventlogthree: [],
      log: 0,
      next: 0,
      account: '0x0',
      targetEnemy: '0x0',
      lastTarget: 0,
      shipContract: {},
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
      alivecheck: 0,
      notified: false,
      loading: false
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
      quickclass={this.quickclass}
      connectwallet={this.connectwallet}
      account={this.state.account}
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
      firescope={this.firescope}
      adjuststat={this.adjuststat}
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
      <Router>
        <Routes>
          <Route path="/" element={
      <div style={{backgroundImage: `url( ${bkgrd} )`, backgroundSize: 'cover'}}>
        <NavBar account = {this.state.account} />
        <div className="container-fluid" style={{marginTop: '7vh'}}>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Ship Wars</h1>
                {this.state.shipOTS === 1 && this.state.healthPoints > 0 && <h2 className="comp-head-sizer" style={{color: '#E3E323'}}>You are the KING of the Seas</h2>}
                {content}
              </div>
            </main>
            <div className="flex mb-5 ml-5"><a className='mr-1' href='http://discord.gg/Sk8T8VKm4a' target="_blank" rel="noopener noreferrer"><img style={{borderRadius: '20%', height: 'calc(13px + 3.5vw)'}} src={discord} alt="info"></img></a><a href='https://twitter.com/NFTgameworks' target="_blank" rel="noopener noreferrer"><img style={{borderRadius: '20%', height: 'calc(13px + 3.5vw)'}} src={twitter} alt="info"></img></a><a href="/terms" className="ml-3" style={{verticalAlign: 'bottom'}}>Terms of Service</a><br></br><br></br><p>Contract: <a href={`https://polygonscan.com/address/${sC.networks[137].address}`} target="_blank" rel="noopener noreferrer" className="ml-0" style={{verticalAlign: 'bottom', alignContent: 'right'}}>{sC.networks[137].address}</a></p></div>
          </div>
        </div>
      </div>} />
          <Route path="/info" element={<Inforoute/>}/>
          <Route path='/terms' element={<Tosroute/>}/>
          <Route path='/owner' element={<Ownerroute/>}/>
        </Routes>
      </Router>
    );
  }
}

function Inforoute() {
  return <InfoPage/>
}
function Tosroute() {
  return <TosPage/>
}
function Ownerroute() {
  return <OwnerPage/>
}

export default App;