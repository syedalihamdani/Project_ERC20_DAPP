import React, {useState } from 'react';
import './App.css';
import getWeb3 from './getWeb3';
import Token from './artifacts/Token.json';
const App = () => {
  const [web3,setweb3]=useState();
  const [account,setaccount]=useState();
  const [contract,setcontract]=useState();
  const [networkName,setnetworkName]=useState("Wallet not");
  const [Balance,setBalance]=useState();
  const [Screen,setScreen]=useState();
  const [OwnerAddress,setOwnerAddress]=useState('j');
  const [Spenderaddress,setSpenderaddress]=useState('j');
  const [Recipientaddress,setRecipientaddress]=useState('j');
  const [Amount,setAmount]=useState();
  const [Amount2,setAmount2]=useState();
  const [wei_equals,setwei_equals]=useState(0);
  const [wei_equals2,setwei_equals2]=useState();
  const [Numberoftoken,setNumberoftoken]=useState();
 const connect = async () => {
      const Web3 = await getWeb3();
      setweb3(Web3);
      const accounts = await Web3.eth.getAccounts();
      setaccount(accounts[0]);
      const balance = await Web3.eth.getBalance(accounts[0]);
      // console.log(balance);
      setBalance(balance);
       const networkId = await Web3.eth.net.getId();
       if(networkId===1){
        setnetworkName("Mainnet")
        alert("Connect to Ropsten network otherwise it won't work")
      }else if(networkId===3){
        setnetworkName("Ropsten")
      }else if(networkId===42){
        setnetworkName("Kovan")
        alert("Connect to Ropsten network otherwise it won't work")
      }else if(networkId===4){
        setnetworkName("Rinkeby")
        alert("Connect to Ropsten network otherwise it won't work")
      }else if(networkId===5){
        setnetworkName("Goerli")
        alert("Connect to Ropsten network otherwise it won't work")
      }else if(networkId===5777){
        setnetworkName("Ganache")
        alert("Connect to Ropsten network otherwise it won't work")
      }else{
        setnetworkName("Undefined")
        alert("Connect to Ropsten network otherwise it won't work")
      }
       const deployedNetwork = Token.networks[networkId];
       const instance = new Web3.eth.Contract(
         Token.abi,
         deployedNetwork && deployedNetwork.address);
         setcontract(instance);
 }
connect();

const name=async()=>{
  if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else{
    
    await contract.methods.name().call((err,result)=>{setScreen(result)});
  }
  
}
const symbol=async ()=>{
  if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else{
    await contract.methods.symbol().call((err,result)=>{setScreen(result)});
  }
}
const owner=async ()=>{
  if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else{
    await contract.methods.owner().call((err,result)=>{setScreen(result)});
  }
}
const Decimals=async ()=>{
  if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else{
    await contract.methods.decimals().call((err,result)=>{setScreen(result)});
  }
}
const price=async()=>{
  if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else{
    await contract.methods.wei_equals().call((err,result)=>{setScreen(`1 Ether = ${result} Tokens`);setwei_equals(result)});
  }
}

const totalSupply=async ()=>{
  if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else{
    await contract.methods.totalSupply().call((err,result)=>{
      // alert(web3.utils.fromWei(result,'ether'))
      setScreen(web3.utils.fromWei(result,'ether'))
    });
  }
}
const owneraddress=(event)=>{
    setOwnerAddress(event.target.value);
}
const balance=async ()=>{
  if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else if(OwnerAddress.length!==42){
    alert("Enter the correct ropsten account address to see the balance.copy the address from your wallet")
  }else{
    await contract.methods.balanceOf(OwnerAddress).call((err,result)=>{setScreen(web3.utils.fromWei(result,'ether'))});

  }

}
const spenderaddress=(event)=>{
  setSpenderaddress(event.target.value);
}
const allowance= async()=>{
  if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else if(OwnerAddress.length!==42){
    alert("Enter the correct ropsten account address to see the allowance.copy the address from your wallet")
  }else if(Spenderaddress.length!==42){
    alert("Enter the correct ropsten account address to see the allowance.copy the address from your wallet")
  }else{
    await contract.methods.allowance(OwnerAddress,Spenderaddress).call((err,result)=>{setScreen(web3.utils.fromWei(result,'ether'))});

  }
}
const amount=(event)=>{
  setAmount(event.target.value);
}
const approve= async()=>{
  if(Amount<1){
    alert(`${Amount} Negative amount can't be approve`)
  }else if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else{
    const Unit=web3.utils.toWei(Amount,'ether');
    await contract.methods.approve(Spenderaddress,Unit).send({from:account});
    // await contract.methods.selfpay().send({value:amount,from:account}).then(()=>{setamount(0)});
  }
}
const amount2=(event)=>{
  setAmount2(event.target.value);
}
const buyToken= async()=>{
  if(Amount2<1){
    alert(`${Amount2} Negative amount can't be approve`)
  }else if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else if(wei_equals===0){
    await contract.methods.wei_equals().call((err,result)=>{setwei_equals(result)});
    buyToken();
  }else{
    const amount2=web3.utils.toWei(Amount2,'ether');
    const tokenprice=amount2/wei_equals;
    await contract.methods.buyToken().send({value:tokenprice,from:account});
  }
}
const price2=(event)=>{
  setwei_equals2(event.target.value);
}
const setPrice= async()=>{
  if(wei_equals2<1){
    alert(`${wei_equals2} Negative amount can't be approve`)
  }else if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else if(account!=="0x39602393131d0732C6ABF4dcd90390dE0DCe3c03"){
    alert("Only the smart contract owner can change the price")
  }else{
    await contract.methods.setPrice(wei_equals2).send({from:account},(err,result)=>{setScreen(result)});
  }
}
const numberoftoken=(event)=>{
  setNumberoftoken(event.target.value);
}
const recipientaddress=(event)=>{
  setRecipientaddress(event.target.value);
}
const transfer= async()=>{
  if(Amount<1){
    alert(`${Numberoftoken} Negative amount can't be approve`)
  }else if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else if(Recipientaddress.length!==42){
    alert("Enter the correct account address otherwise it won't work")
  }else{
    const Unit=web3.utils.toWei(Numberoftoken,'ether');
    await contract.methods.transfer(Recipientaddress,Unit).send({from:account});
  }
}
const transferfrom= async()=>{
  if(Amount<1){
    alert(`${Numberoftoken} Negative amount can't be approve`)
  }else if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else if(Recipientaddress.length!==42){
    alert("Enter the correct account address otherwise it won't work")
  }else if(OwnerAddress.length!==42){
    alert("Enter the correct account address otherwise it won't work")
  }else{
    const Unit=web3.utils.toWei(Numberoftoken,'ether');
    await contract.methods.transferFrom(OwnerAddress ,Recipientaddress, Unit).send({from:account});
  }
}
const restart=()=>{
 window.location.reload(false);
}
  return (
    <>
  <div className="page">  
  <nav className="navbar">
  <div className="upper">
      <h4>{networkName} Connected</h4>
      <h4>Balance: {Balance} wei</h4>
      <button className="btn" onClick={restart}><h4>Connect to Wallet</h4></button></div>
  <div className="lower">Account:{account}</div>
  </nav>
  <div className="Main">
  <div className="section">
  <div className="screen">{Screen}</div>
      <button className="btn2" onClick={()=>name()}>Token Name</button>
      <button className="btn2" onClick={()=>symbol()}>Token Symbol</button>
      <button className="btn2" onClick={()=>owner()}>Token Owner</button>
      <button className="btn2" onClick={()=>totalSupply()}>Total tokens </button>
      <button className="btn2" onClick={()=>Decimals()}>Token Decimals </button>
  <input className="input" placeholder="Account address" type="string" onChange={owneraddress}></input>
      <button className="btn2" onClick={()=>balance()}>Token Balance</button>
  <input className="input" placeholder="Account address" type="string" onChange={owneraddress}></input>
  <input className="input" placeholder="Spender address" type="string" onChange={spenderaddress}></input>
      <button className="btn2" onClick={()=>allowance()}>Token allowance</button>
  <input className="input" placeholder="Spender address" type="string" onChange={spenderaddress}></input>
  <input className="input" placeholder="amount" type="number" onChange={amount}></input>
      <button className="btn2" onClick={()=>approve()}>Approve Token</button>
  <input className="input" placeholder="amount" type="number" onChange={amount2}></input>
      <button className="btn2" onClick={()=>buyToken()}>Buy tokens</button>
      <button className="btn2" onClick={()=>price()}>Token price </button>
  <input className="input" placeholder="1 Ether equals" type="number" onChange={price2}></input>
      <button className="btn2" onClick={()=>setPrice()}>Set Token price</button>
  <input className="input" placeholder="Recipient address" type="string" onChange={recipientaddress}></input>
  <input className="input" placeholder="Number of tokens" type="number" onChange={numberoftoken}></input>
      <button className="btn2" onClick={()=>transfer()}>Transfer Token</button>
  <input className="input" placeholder="From address" type="string" onChange={owneraddress}></input>
  <input className="input" placeholder="To address" type="string" onChange={recipientaddress}></input>
  <input className="input" placeholder="Number of tokens" type="number" onChange={numberoftoken}></input>
      <button className="btn2" onClick={()=>transferfrom()}>Transfer token from</button>
  </div>
      
  </div>
  </div>
    </>
  )
}
export default App;
