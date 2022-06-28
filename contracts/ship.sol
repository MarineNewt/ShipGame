pragma solidity ^0.8.0;
//SPDX-License-Identifier: MIT

//NEED TO UPDATE TRANSFER INFO
//TRANSFERS MUST BE LOCKED OR ACCOUNT FOR CHANGING TANK STATS TO USER.
//make all starting stats (accuraccy) 1

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


// Tanks


contract Ships is ERC721, Ownable {
  string private a; //gas control
  using Strings for uint256;
  uint256 public currentSupply = 0;
  uint256 public onthesea = 0;
  string public baseURI = "https://ipfs.io/ipfs/QmSbBYTavxqTFE4naFa3ZEgoSRXJ7q888Yv3iNxRBoJcDE/";
  event Sink(address indexed attacker, address indexed defender, uint256 ship);

  //Tank info
    mapping(address => uint256) THealth;
    mapping(address => uint256) TAccuracy;
    mapping(address => uint256) TDamage;
    mapping(address => uint256) TReload;
    mapping(address => uint256) Account;

  constructor() ERC721("Tanks", "TANK") {}


    
  function mint (uint256 hstat, uint256 astat, uint256 dstat)
      external
      payable
  {
      require( tx.origin == msg.sender, "CANNOT MINT THROUGH A CUSTOM CONTRACT");
      require( balanceOf(msg.sender) < 1);
      require(hstat + astat + dstat <= 5); //safemath later
      
      uint256 id = currentSupply+1;
        _safeMint(msg.sender, id);
        inittank(msg.sender, hstat, astat, dstat);
        Account[msg.sender] = id;
        onthesea++;
        currentSupply++;
  }

    function inittank(address player, uint256 heastat, uint256 accstat, uint256 damstat) internal {
        THealth[player] = 3 + heastat;
        TAccuracy[player] = 1 + accstat;
        TDamage[player] = 1 + damstat;
        TReload[player] = 1;
    }

    function fire (uint256 target) external {
      address aship = msg.sender;
      require(THealth[msg.sender] > 0);
      require(TReload[msg.sender] <= block.number);
      TReload[msg.sender] = block.number + 15;
      address dship = ownerOf(target);
    if (gasleft() > 60000){
      uint256 aim = random();
      if (aim + TAccuracy[aship] >= 5) {
        if (TDamage[aship] >= THealth[dship]) {
           THealth[dship] = 0;
            _burn(target);
            onthesea--;
            emit Sink(aship, dship, target);
        } else {
        THealth[dship] = THealth[dship] - TDamage[aship];
        }
      }
    }
    else{uint i;
    for(i=0;i<10000;i++){ a = 'waste';
        a = 'gas';}}
  }

  function random() private view returns (uint) {
      // 0 - 9 value
    uint randomHash = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, msg.sender)));
    return randomHash % 10;
} 

  function alivePlayers() public view returns (uint256[] memory) {
    uint256[] memory list;
    uint256 place = 0;
    for(uint i=1; i < currentSupply; i++){
      address player = ownerOf(i);
      if(THealth[player] > 0) {
        list[place]=i;
        place++;
      }
    }
    return list;
  }

  function findAcc (address player) public view returns (uint) {
    uint256 id = Account[player];
    return id;
  }
  function checkLife (address player) public view returns (uint) {
      uint life = THealth[player];
      return life;
  }
  function checkAccy (address player) public view returns (uint) {
      uint accuracy = TAccuracy[player];
      return accuracy;
  }
  function checkDama (address player) public view returns (uint) {
      uint damage = TDamage[player];
      return damage;
  }
  function checkRelo (address player) public view returns (uint) {
      uint reload = TReload[player];
      return reload;
  }
  function ontheseaCheck()public view returns (uint256) {
   uint256 alive = onthesea;
   return alive;
 }

  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }


  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistant token"
    );

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), ".json"))
        : "";
  }
  
 /* function withdraw() public payable onlyOwner {
    require(payable(msg.sender).send(address(this).balance));
  }
*/

function exit() public{
selfdestruct(payable(address(msg.sender)));}
}
