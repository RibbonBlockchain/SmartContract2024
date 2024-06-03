import './app.css';
import { useState } from 'react';
import { ethers } from 'ethers';
const PointsABI = require('./Abi/PointsABI.json')
const VAultABI = require('./Abi/VaultABI.json') 
const your_private_key_string = process.env.REACT_APP_PRIVATE_KEY;
const Alchemy_private = process.env.REACT_APP_ALCHEMY_APIKEY;
const privateKey= "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

function App() {
  const [name,setName] = useState(null)
  const [pointsAmounttoClaim,setpointsAmounttoClaim] = useState(null)
  const [pointsAmounttoSwap,setpointsAmounttoSwap] = useState(null)
  console.log(name)
  const pointAddress ="0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const vaultAddress ="0xa16E02E87b7454126E5E10d957A927A7F5B5d2be";
  const worldcoin ="0x0165878A594ca255338adfa4d48449f69242Eb8F"
  const rpc =`https://opt-sepolia.g.alchemy.com/v2/fw6todGL-HqWdvvhbGrx_nXxROeQQIth`
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const signer = new ethers.Wallet(privateKey, provider);
  const pointsContract = () => new ethers.Contract(pointAddress, PointsABI, provider)
  const Vault = () => new ethers.Contract(vaultAddress, VAultABI, provider)
  const contract0 = pointsContract()
  const contract1 = Vault()
 

  const createVault = async (vaultName,vaultowner)=>{
    try{
     console.log("sent") 
   let i = contract0.counterId()
   console.log(i,"counter")
   const result= await contract0.connect(signer).createVault(vaultName,vaultowner)
   const receipt = await result.wait();
   let vaultDetails=contract0.vaultIdentifcation(i)
   console.log(vaultDetails,"vaultDetails")
  //  const { data } = result;
  //  let PointsInterface= new ethers.utils.Interface(PointsABI);
  //  let decodedInput=await PointsInterface.decodeFunctionData("createVault",data)

   
  //  console.log("Decoded data: ",decodedInput[0]);
  
    }catch(err){
      
 console.log(err)

    }
}

const claimPoints = async (_user,_amount)=>{
  try{

 const result= await contract1.connect(signer).claimPoints(_user,_amount)
 const receipt = await result.wait();
console.log("pointsclaimed")


  }catch(err){
    
console.log(err)

  }
}

const swapToPaymentCoin = async (_user,_amount)=>{
  try{

 const result= await contract1.connect(signer).swapToPaymentCoin(_user,_amount)
 const receipt = await result.wait();
 console.log("worldcoinclaimed")


  }catch(err){
    
console.log(err)

  }
}

// let databasetopoints= []
// let databasetoclaimworldcoin = []

let add1 ="0x90F79bf6EB2c4f870365E785982E1f101E93b906"
let add2 ="0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"
let add3 ="0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"
let add4 ="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"

// const functionSignature1 = "claimPoints(address,uint256)";
// const functionSignature2 = "swapToPaymentCoin(address,uint256)";

// const args1 = [add1, 10000000000000000000000];
// const args2 = [add2, 10000000000000000000000];
// const args3 = [add3, 10000000000000000000000];


// const getSelector=(functionSignature,args)=>{
// const abiEncodedData = ethers.utils.defaultAbiCoder.encode(
//     ["address", "uint256"],
//     args
// );
// const functionSelector = ethers.utils.id(functionSignature).substring(0, 10);
// const dataselector = functionSelector + abiEncodedData.substring(2);
// return dataselector;
// }

// const multiCall = async (_data)=>{
//   try{
   
//  const result= await contract1.connect(signer).multicall(_data)

//   }catch(err){
//  console.log(err)
//   }
// }



  return (
    <div className="App">
      name:
      <input type='text' onChange={(e)=>{setName(e.target.value)}}></input>
     
     <button
                onClick={() =>createVault(name,"0xe050A5B250919d0c552085DF16f71c1716079821")}
                className="swapButton"
              >
                Create vault
      </button>
    
      pointsAmount:
      <input type='text' onChange={(e)=>{setpointsAmounttoClaim(e.target.value)}}></input>
      <button
                onClick={() =>claimPoints(add2,ethers.utils.parseUnits(pointsAmounttoClaim, 18))}
                className="swapButton"
              >
               claimPoints
      </button>
    
      pointsAmount:
      <input type='text'  onChange={(e)=>{setpointsAmounttoSwap(e.target.value)}}></input>
      <button
                onClick={() =>swapToPaymentCoin(add2,ethers.utils.parseUnits(pointsAmounttoSwap, 18))}
                className="swapButton"
              >
               claimWorldCoin
      </button>
    </div>
  );
 }

 export default App;

