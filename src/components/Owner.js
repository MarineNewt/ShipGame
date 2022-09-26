import React, { Component } from 'react'
import Web3 from 'web3';
import sC from '../contracts/ship.json';


class Owner extends Component {
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()      }
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
      async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const networkId = await web3.eth.net.getId() 
        const shipContractData = sC.networks[networkId]
        if(shipContractData) {
          const shipContract = new web3.eth.Contract(sC.abi, shipContractData.address)
          this.setState({ shipContract })}
        }

    refund = (token) => {
        this.setState({loading: true})
        this.state.shipContract.methods.refund(token).send({ from: this.state.account, gas: 225000, maxFeePerGas: 100000000000, maxPriorityFeePerGas: 36100000000, }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })}
      withdraw = () => {
        this.setState({loading: true})
        this.state.shipContract.methods.withdraw().send({ from: this.state.account, gas: 225000, maxFeePerGas: 100000000000, maxPriorityFeePerGas: 36100000000, }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })}
      endgame = () => {
        this.setState({loading: true})
        this.state.shipContract.methods.endgame().send({ from: this.state.account, gas: 225000, maxFeePerGas: 100000000000, maxPriorityFeePerGas: 36100000000, }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })}
      exit = () => {
        this.setState({loading: true})
        this.state.shipContract.methods.exit().send({ from: this.state.account, gas: 225000, maxFeePerGas: 100000000000, maxPriorityFeePerGas: 36100000000, }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })}

  render() {
    return (
        <div id="content" className="mt-3 compbox comp-font-sizer" style={{textAlign:'left'}}>   
            <h2 className='mr-5 comp-head-sizer'>Owner Functions</h2>
            <br></br>
            <form className="mb-0" onSubmit={(event) => {
                    event.preventDefault()
                    let token
                    token = this.input.value.toString()
                    this.refund(token)}}>
                   <div className='flex'>
                   <button type="submit" className="btn btn-primary mb-3" style = {{color: "white", backgroundColor: "black"}} >Refund</button>
                   <input
                    type="text"
                    ref={(input) =>  { this.input = input }}
                    className=""
                    placeholder="0"
                    required />
                    </div>

            </form>  

            <form className="mb-0" onSubmit={(event) => {
                    event.preventDefault()
                    this.endgame()}}>
                   <button type="submit" className="btn btn-primary mb-3" style = {{color: "white", backgroundColor: "black"}} >End game</button>
            </form>  

            <form className="mb-0" onSubmit={(event) => {
                    event.preventDefault()
                    this.withdraw()}}>
                   <button type="submit" className="btn btn-primary mb-3" style = {{color: "white", backgroundColor: "black"}} >Withdraw</button>
            </form>  

            <form className="mb-0" onSubmit={(event) => {
                    event.preventDefault()
                    this.exit()}}>
                   <button type="submit" className="btn btn-primary mb-3" style = {{color: "white", backgroundColor: "black"}} >Exit</button>
            </form>  
        </div>
    );
  }
}

export default Owner;