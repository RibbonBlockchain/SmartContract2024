// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.8.22;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ribbonVault.sol";

contract points is ERC20,Ownable{

    struct vaultId{
        address vaultAdrress;
        string  name;  
    }
    uint public counterId=1;
    address public vaultAdmin;
    mapping (string =>bool) nameVault;
    mapping (uint=>vaultId)public vaultIdentifcation;
    mapping (address=>bool)approveToBurn;
 
    
    constructor(address addvaultadmin)ERC20("Points","PNT")Ownable(msg.sender){
       _mint(msg.sender,6000000000*10**18);
       _mint(address(this),4000000000*10**18);
        vaultAdmin=addvaultadmin;
    
    }

    function mint(address add,uint amount)public onlyOwner{
        _mint(add,amount);
    }

     function TranferToVault(address Vaultadd,uint amount)public {
         require(msg.sender==vaultAdmin,"not approved");
        _TranferToVault(Vaultadd,amount);
    }

     function _TranferToVault(address Vaultadd,uint amount)internal {
        _approve(address(this),msg.sender,amount);
        transferFrom(address(this), Vaultadd, amount);
    }

     function setVAultAdmin(address addvaultadmin)public onlyOwner{
        vaultAdmin=addvaultadmin;  
    }

          
    function burn(address account, uint256 value)public {
        require(approveToBurn[msg.sender] == true, "you are not approved to burn");
        _burn( account, value);
 
    }

    function setApproveToburn(address approvedAdd, bool _approve)external onlyOwner {
              _setApproveToburn(approvedAdd, _approve);
    }
    function _setApproveToburn(address approvedAdd, bool _approve)internal {
              approveToBurn[approvedAdd]=_approve;
    }

    function createVault(string memory vaultName,address vaultOwner,address paymentAddress,uint pointsAmountForVault)public  returns(vaultId memory){
        require(msg.sender==vaultAdmin,"not approved");
         vaultId storage _vaultid =  vaultIdentifcation[counterId];
         require(nameVault[vaultName]==false, "name taken");
         nameVault[vaultName]= true;
          vault _vault =new vault(vaultOwner,vaultName,paymentAddress,address(this));
         _vaultid.vaultAdrress =address(_vault);
         _vaultid.name=vaultName;
        // vaultIdentifcation[counterId]=_vaultid;
        // _mint(address(_vault),pointsAmountForVault);
        _TranferToVault(address(_vault),pointsAmountForVault);
         counterId++;
         _setApproveToburn(address(_vault) , true);
         return _vaultid;
    }

    
}