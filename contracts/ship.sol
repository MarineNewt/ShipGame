pragma solidity ^0.8.0;
//SPDX-License-Identifier: MIT

/*
    modifier shiptran(address from, address to, uint256 tokenId) override {
        if(to != address(0)){
            require( balanceOf(to) < 1);
            Account[to] = tokenId;
            THealth[to] = THealth[from];
            TAccuracy[to] = TAccuracy[from];
            TDamage[to] = TDamage[from];
            TReload[to] = TReload[from];
            THealth[from] = 0;
            TAccuracy[from] = 0;
            TDamage[from] = 0;
            TReload[from] = 0;
            }
            _;}
*/

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract ShipWars is ERC721, Ownable {
  string private a; //gas control
  using Strings for uint256;
  bool public game = true;
  uint256 public supplyMinted = 0;
  uint256 public onthesea = 0;
  string public baseURI = "https://ipfs.io/ipfs/QmS4bUnDG6wp4pbPZaBu7Yjzkn9hBqTioTwXkzHtpiPtmk/";
  event Action(string atype, uint256 indexed aship, uint256 ship);

  //Ship info
    mapping(address => uint256) THealth;
    mapping(address => uint256) TAccuracy;
    mapping(address => uint256) TDamage;
    mapping(address => uint256) TReload;
    mapping(address => uint256) Account;
    mapping(address => uint256) TProtection;

  constructor() ERC721("ShipWars", "SHIP") {}


    
  function mint (uint256 hstat, uint256 astat, uint256 dstat)
      external
      payable
  {
      require(game);
      require (msg.value >= (1 * 10 **18));
      require( tx.origin == msg.sender, "CANNOT MINT THROUGH A CUSTOM CONTRACT");
      require( balanceOf(msg.sender) < 1);
      require(hstat + astat + dstat <= 5); //safemath later
      
      uint256 id = supplyMinted+1;
        _safeMint(msg.sender, id);
        initship(msg.sender, hstat, astat, dstat);
        Account[msg.sender] = id;
        onthesea++;
        supplyMinted++;
  }

    function initship(address player, uint256 heastat, uint256 accstat, uint256 damstat) internal {
        THealth[player] = 50 + heastat * 25;
        TAccuracy[player] = 1 + accstat * 2;
        TDamage[player] = 10 + damstat * 5;
        TReload[player] = 1;
        TProtection[player] = block.number;
    }

    function fire (uint256 target) external {
      address aship = msg.sender;
      uint256 atk = findAcc(msg.sender);
      require(THealth[msg.sender] > 0);
      require(TReload[msg.sender] <= block.number);
      TReload[msg.sender] = block.number + 18;
      address dship = ownerOf(target);
      require(dship != msg.sender);

    if (gasleft() > 65000){
      //brigade protection
      uint256 pen;
      if(block.number - TProtection[dship] <= 12){pen = 2;}
      if(block.number - TProtection[dship] <= 6){pen = 4;}
      else{pen = 0;}
      //aim
      uint256 aim = random() - pen;
      if (aim + TAccuracy[aship] >= 11) {
        if (TDamage[aship] >= THealth[dship]) {
           THealth[dship] = 0;
            _burn(target);
            onthesea--;
            require(payable(msg.sender).send(9 * 10 **17));
            emit Action("Sunk", atk, target);
        } else {
        THealth[dship] = THealth[dship] - TDamage[aship];
        emit Action("Hit", atk, target);
        }
      } else {
        emit Action("Missed", atk, target);
      }

    }
    else{uint i;
    for(i=0;i<10000;i++){ a = 'waste';
        a = 'gas';}}
  }

  //View
  function random() private view returns (uint) {
      // 0 - 19 value
    uint randomHash = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, msg.sender)));
    return randomHash % 20;
  } 

  function checkIfTokenExist(uint _tokenId) external view returns(uint256) {
        if (_exists(_tokenId)) {return 1;}
        return 0;
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
  function idOTS()public view returns (uint256 [] memory) {
   uint256[] memory tokenIds = new uint256[](onthesea);
   uint256 x = 0;
       for (uint256 i; i <= supplyMinted; i++) {
        if(_exists(i)) {
        tokenIds[x] = i;
        x++;}}
   return tokenIds;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }


  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistant token"
    );
    address target = ownerOf(tokenId);

    if(TDamage[target] >= (10 + 15)){
      string memory currentBaseURI = _baseURI();
      return bytes(currentBaseURI).length > 0
          ? string(abi.encodePacked(currentBaseURI, "4", ".json"))
          : "";
    }
    if(TAccuracy[target] >= (1 + 6)){
      string memory currentBaseURI = _baseURI();
      return bytes(currentBaseURI).length > 0
          ? string(abi.encodePacked(currentBaseURI, "2", ".json"))
          : "";
    }
    if(THealth[target] >= (50 + 75)){
      string memory currentBaseURI = _baseURI();
      return bytes(currentBaseURI).length > 0
          ? string(abi.encodePacked(currentBaseURI, "3", ".json"))
          : "";
    }
    else{
      string memory currentBaseURI = _baseURI();
      return bytes(currentBaseURI).length > 0
          ? string(abi.encodePacked(currentBaseURI, "1", ".json"))
          : "";
    }
  }
  
  function withdraw() public payable onlyOwner {
    require(payable(msg.sender).send(address(this).balance));
  }


  function endgame() external onlyOwner{
    game = false;
  }

  function exit() external onlyOwner{
    selfdestruct(payable(address(msg.sender)));}


}
