import React, { Component } from 'react';
import Web3 from 'web3';
import sC from '../contracts/ship.json'
import Main from './Main.js'
import Minter from './Minter'
import logo from './shipic.jpg';
import './App.css';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    setInterval(() => {
      this.loadBlockchainData();
    }, 6500);
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId() 
    let blockNumber = await web3.eth.getBlockNumber()
    this.setState({ blockNumber })

    const shipContractData = sC.networks[networkId]
    if(shipContractData) {
      const shipContract = new web3.eth.Contract(sC.abi, shipContractData.address)
      this.setState({ shipContract })
      let shipContractBalance = await shipContract.methods.balanceOf(this.state.account).call()
      this.setState({ shipContractBalance: shipContractBalance.toNumber() })
      let shipContractSupply = await shipContract.methods.currentSupply().call()
      this.setState({ shipContractSupply: shipContractSupply.toNumber() })
      let healthPoints = await shipContract.methods.checkLife(this.state.account).call()
      this.setState({ healthPoints: healthPoints.toNumber()  })
      let accuracyPoints = await shipContract.methods.checkAccy(this.state.account).call()
      this.setState({ accuracyPoints: accuracyPoints.toNumber()  })
      let damagePoints = await shipContract.methods.checkDama(this.state.account).call()
      this.setState({ damagePoints: damagePoints.toNumber()  })
      }
    else {
      window.alert('shipContract contract not deployed to detected network. ')
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
    let stathealth = vone
    this.setState({stathealth: stathealth.toString()})
    let stataccuracy = vtwo
    this.setState({stataccuracy: stataccuracy.toString()})
    let statdamage = vthree
    this.setState({statdamage: statdamage.toString()})
    this.setState({loading: true})
    this.state.shipContract.methods.mint(stathealth,stataccuracy,statdamage).send({ from: this.state.account }).on('transactionHash', (hash) => {
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
  })}

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      shipContract: {},
      shipContractBalance: '0',
      shipContractSupply: '0',
      healthPoints: '0',
      accuracyPoints: '0',
      damagePoints: '0',
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
      content = <p id="loader" className="text-center">Loading...</p>
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
      />}
      else {
      content = <Main
      mint={this.mint}
      fire={this.fire}
      adjuststat={this.adjuststat}
      shipContractBalance={this.state.shipContractBalance}
      shipContractSupply={this.state.shipContractSupply}
      blockNumber={this.state.blockNumber}
      healthPoints={this.state.healthPoints}
      accuracyPoints={this.state.accuracyPoints}
      damagePoints={this.state.damagePoints}
      />}
    }
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <div
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            rel="noopener noreferrer"
          >
            Ship War Game 
          </div>
          <small className="navbar-brand col-sm-1 "> {this.state.account} </small>
          <img src={logo} height="40" width="40"  alt="" />
        </nav>

        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Ship War</h1>
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