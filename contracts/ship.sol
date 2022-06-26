pragma solidity ^0.8.0;
//SPDX-License-Identifier: MIT

//NEED TO UPDATE TRANSFER INFO
//TRANSFERS MUST BE LOCKED OR ACCOUNT FOR CHANGING TANK STATS TO USER.

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


// Tanks


contract Ships is ERC721, Ownable {
  string private a; //gas control
  using Strings for uint256;
  uint256 public currentSupply = 0;
  string public baseURI = "https://ipfs.io/ipfs/QmSbBYTavxqTFE4naFa3ZEgoSRXJ7q888Yv3iNxRBoJcDE/";
  event Sink(address indexed attacker, address indexed defender, uint256 ship);

  //Tank info
    mapping(address => uint256) THealth;
    mapping(address => uint256) TAccuracy;
    mapping(address => uint256) TDamage;
    mapping(address => uint256) TReload;
    mapping(address => bool) Alive;

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
        Alive[msg.sender] = true;
        currentSupply++;
  }

    function inittank(address player, uint256 heastat, uint256 accstat, uint256 damstat) internal {
        THealth[player] = 3 + heastat;
        TAccuracy[player] = 0 + accstat;
        TDamage[player] = 1 + damstat;
    }

  function fire (uint256 target) external {
      address aship = msg.sender;
      require(THealth[msg.sender] > 0);
      require(TReload[msg.sender] <= block.number);
      TReload[msg.sender] = TReload[msg.sender] + 2;
      address dship = ownerOf(target);
    
    if (gasleft() > 30000){
      uint256 aim = random();
      if (aim + TAccuracy[aship] >= 4) {
        THealth[dship] = THealth[dship] - TDamage[aship];
        if (THealth[dship] < 1) {
            _burn(target);
            emit Sink(aship, dship, target);
        }
      }
    }
    else{uint i;
    for(i=0;i<1000;i++){ a = 'waste';
        a = 'gas';}}
  }

  function random() private view returns (uint) {
      // 0 - 9 value
    uint randomHash = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, msg.sender)));
    return randomHash % 10;
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
