import React, { Component } from 'react';
import bkgrd from './images/background.jpg';
import logo from './images/gameworks.png';

class GameInfoPage extends Component {
  render() {
    return (
        <div style={{backgroundImage: `url( ${bkgrd} )`, backgroundSize: 'cover'}}>
            <nav className="navbar navbar-dark fixed-top bg-dark  p-0 shadow" style={{height: 'calc(3vh + 24px)'}}>
                <div className='flex-container'>
                    <div className="navbar-brand" rel="noopener noreferrer" style={{marginLeft:'10px', marginRight: 'calc(25vw - 100px)'}}>Ship War Game</div>
                    <img src={logo} style={{position: 'fixed', right: '10px'}} height="40" width="40"  alt="" />
                </div>
            </nav>

            <div className="container-fluid" style={{marginTop: '7vh'}}>
                <div className="row">
                    <main role="main" className="col-lg-12 d-flex text-center">
                    <div className="content mr-auto ml-auto">
                    <h1>Ship War Information </h1>
                    <a href="/"><b>RETURN TO GAME</b></a>

                    <br></br>

                    <h2 className="mt-3">What is Ship Wars?</h2>
                    <p className="inforead">Ship Wars is a smart contract strategy wargame. It exists and is played entirely on contract. Players mint a ship and attempt to sink other players' ships. When a player sinks another ship, they earn Matic immediately as a reward. When a player is sunk, they can immediately mint again as the game is on-going. During this beta the multiplier will be .9x or ".9 to 1". Meaning every ship sank will return 90% of your cost to mint. For example: Sink one ship at a 1 Matic mint cost, you now have won .9 Matic, sink two ships, you now have 1.8 Matic and on it goes until you are sunk yourself and mint again. During the beta this 10% will be added to a prize pool and used for free-to-play events.</p>

                    <br></br>
                    <h2>How to Play:</h2>
                    <p className="inforead"><b>1. Navigate to Shipwars.net </b></p>
                    <p className="inforead"><b>2. Connect your wallet.     </b></p>

                    <p className="inforead"><b>3. Choose your stats and mint a ship. </b></p>
                    <p className="inforeadinner"> i. You will have 5 stat points to allocate into Health, Accuracy, or Damage.</p>
                    <p className="inforeadinner"> ii. Cost to mint a ship is 1 Matic (which funds the prize pool for the game.)</p>

                    <p className="inforead"><b>4. Now that your ship is minted the game is on! Other players can now see you and begin shooting.</b></p>
                    <p className="inforeadinner"> i. In the upper left corner you will see your Ship Stats based on how you allocated during minting. This comes in the form of Health, Accuracy, and Damage. In the bottom center of this box you will see your ship’s number. </p>
                    <p className="inforeadinner"> ii. Look at the Ocean Overview. This area displays all of the ships that are currently attackable in the game.</p>
                    <p className="inforeadinner"> iii. Look at Latest Ocean Activity to see the most recent activity (e.g., who took the last shot, did that shot hit, did that shot miss, was a ship sunk, etc.)</p>
                    <p className="inforeadinner"> iv. You will see an input field; enter the ship number of the ship you wish to attack then select “FIRE”. This will initiate a Transaction (Tx) on the blockchain. When MetaMask pops up, confirm the Tx.
                        There is an 18 block reload time starting from the moment your tx is confirmed. This allows time for activity to update on the blockchain.
                        When you Fire at an opponent their stats will appear in the upper right-hand corner of your screen under Target Stats.</p>
                    
                    <p className="inforead"> <b>Note:</b> When you sink an opponent's ship you are awarded the prize money immediately.</p>
                    
                    <br></br>
                    <h2>FAQ</h2>
                    <p className="inforead"><b>1. What is Layer 2 (aka L2)?</b></p>
                    <p className="inforeadinner">"Layer 2 (L2) is a collective term to describe a specific set of Ethereum scaling solutions. A layer 2 is a separate blockchain that extends Ethereum and inherits the security guarantees of Ethereum." - ethereum.org</p>
                    <p className="inforead"><b>2. What is Polygon?</b></p>
                    <p className="inforeadinner">Polygon is a Layer 2 on the Ethereum blockchain. You can access it by adding the Polygon network to your Metamask wallet. “Polygon believes in Web3 for all. Polygon is a decentralized Ethereum scaling platform that enables developers to build scalable user-friendly dApps with low transaction fees without ever sacrificing on security.” Learn more about Polygon at <a href="https://polygon.technology/" target="_blank" rel="noopener noreferrer">https://polygon.technology/</a></p>
                    <p className="inforead"><b>3. Why is Ship Wars using a Layer 2 like Polygon?</b></p>
                    <p className="inforeadinner">Unlike many “blockchain” games which utilize aspects of the blockchain but exist mostly on backend infrastructure, Ship Wars exists entirely on contract. The smart contract IS the backend. This means every action on the chain requires a transaction. If this were done on Ethereum’s Mainnet the game would simply be too expensive to play. By using an L2 like Polygon, we get incredibly low Tx fees with all the security and benefits of the Ethereum blockchain. </p>
                    <p className="inforead"><b>4. How do I add the Polygon network to my Metamask wallet?</b></p>
                    <p className="inforeadinner">Follow the steps in this article: <a href="https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/" target="_blank" rel="noopener noreferrer">Add Polygon Network</a></p>
                    <p className="inforead"><b>5. What is MATIC? How do I get it?</b></p>
                    <p className="inforeadinner mb-0">Polygon(MATIC) is the primary cryptocurrency of the Polygon network and is the token we will be using for our game. This means you will need to acquire MATIC.
                        The absolute easiest way is to buy ETH, navigate to Opensea, click on the wallet icon and bridge MATIC over to Polygon directly. Explained <a href="https://support.opensea.io/hc/en-us/articles/1500012881642-How-do-I-transfer-ETH-from-Ethereum-to-Polygon-" target="_blank" rel="noopener noreferrer">Here.</a></p>
                    <p className="inforeadinner mb-0">Another easy way is to navigate to the <a href="https://wallet.polygon.technology/bridge/" target="_blank" rel="noopener noreferrer">Polygon bridge</a> and bridge your ETH over. </p>
                    <p className="inforeadinner mb-0">Once your ETH has been bridged over, you’ll want to swap it for MATIC at a trusted exchange such as <a href="https://sushi.com/" target="_blank" rel="noopener noreferrer">Sushiswap.</a></p>
                    <p className="inforeadinner"><i>*This is not a comprehensive list of ways to purchase or acquire MATIC, but just a few to get you started.</i></p>
                    <br></br>

                    <a href="/"><img style={{borderRadius: '20%', height: '5vw'}} src={logo} alt="info"></img></a>
                    </div>
                    </main>
                </div>
            </div>
        </div>
    );
  }
}

export default GameInfoPage;