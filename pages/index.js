import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React from 'react';
import { Swapabi , SwapAddress , Token1abi , Token2abi ,Token1Address , Token2Address} from '../contants';
import Web3Modal from 'web3modal';
import {providers , Contract , BigNumber , utils , ethers} from 'ethers';
export default function Home() {
    const zero = BigNumber.from(0);
  const [walletConnected , setwalletConnected] = React.useState(false)
  const [balanceOfAmanDevTokens ,setbalanceOfAmanDevTokens] = React.useState(zero);
  const [userAddress, setuserAddress]=React.useState();
  const [token1balance , settoken1balance]=React.useState("");
  const [ claimedDate , setclaimedDate] = React.useState();
  const [lastused , setlastused] = React.useState();
  const [numclaim , setnumclaim]= React.useState();
  const [numclaim0 , setnumclaim0] = React.useState();
    const [myArray, setMyArray] = React.useState([]);
      const [myArray1, setMyArray1] = React.useState([]);
      const [TokenMinted , setTokenMinted] = React.useState(zero);
  const [loading , setloading] = React.useState(false);
  const [ input , setinput] = React.useState();
  const [input2 , setinput2] = React.useState();
  const [bnbBalances , setbnbBalance] = React.useState();
const [ userallowance , setuserallowance] = React.useState(false);
  const [lastuserTime , setlastuserTime] = React.useState();
  const [ lowBalance , setlowBalance ] = React.useState(false);
  const [allowance, setAllowance] = React.useState('');
  const [ userAmount , setuserAmount] = React.useState();
  const [lastuserAmount , setlastuserAmount] = React.useState();
  const [userMonths , setuserMonths] = React.useState();
  const [ Enable , setEnable] = React.useState();


  const ModelRef= React.useRef();
  const getSignerOrProvider = async(needSigner = false) =>{
    const provider = await ModelRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const {chainId} = await web3Provider.getNetwork();
    if(chainId != 97){
      window.alert("Change Your Network to BNB Network");
      throw new Error("Change Your Network to BNB Network");
    }
    if(needSigner ){
      const signer = await web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  }
  console.log(userallowance);



  const getBlanceTokenAmanDevToken = async() =>{
    try{
    const provider = await getSignerOrProvider();
    const myContract = new Contract(SwapAddress , Swapabi , provider);
      const signer = await getSignerOrProvider(true);
      const address = await signer.getAddress();
            setuserAddress(address);
  const tx = await myContract.investments(address);
      const tx2 = await myContract.lastuserAmount(address);
            const tx3 = await myContract.lastuserAmount(address);
                  const tx4 = await myContract.lastused(address);


      const amount1 = tx.monthlyReward;
      const amount = ethers.utils.formatUnits(amount1,18);
      const amount2 = ethers.utils.formatUnits(tx2,18);

      const mon = tx.totalmonths;
            const formattedValue3 = (parseFloat(mon) * 1).toFixed(0);
      setuserMonths(formattedValue3);
      setlastuserAmount(tx4);
            setuserAmount(amount);
      setlastuserAmount(amount2);



    }catch(err){
      console.error(err);
    }
  }
  console.log(typeof(numclaim));
console.log(numclaim);

  const lastTimestamp = myArray1.slice(-1)[0];
  const date = new Date(lastTimestamp * 1000); 
    date.setMinutes(date.getMinutes() + 5); // change 5 to change the added time
const claimlastMoney = async() =>{
try{
      const provider = await getSignerOrProvider();
        const signer = await getSignerOrProvider(true);
      const myContract = new Contract(SwapAddress , Swapabi , signer);
      const address = await signer.getAddress();

  const tx = await myContract.claimlastReward();
  await tx.wait();
      window.location.replace("/");


}catch(err){
  console.error(err);
            if (err.message.includes('execution reverted: Claim not available yet')) {
        window.alert('You havnt reached the claim date yet!');
      } 


}




}
const renderAmount =  () =>{
  const links = [];
  for (let i = 0; i < userMonths; i++) {
    links.push(<a className="mb-[]" key={i}>{userAmount} <br/></a>);
  }
  return(
    <>
    <div>
    {links}
  </div>
<div>
    {lastuserAmount}
    </div>
    </>
  ) ;

}
const renderClaim = async() =>{
  try{
      const provider = await getSignerOrProvider();
      const myContract = new Contract(SwapAddress , Swapabi , provider);
      const signer = await getSignerOrProvider(true);
      const address = await signer.getAddress();

  const tx = await myContract.userDetails(address);
    setMyArray(tx. withdrawn);

  }catch(err){
    console.error(err);
  }
}

const claimMoney = async() =>{
  try{
      const provider = await getSignerOrProvider();
        const signer = await getSignerOrProvider(true);
      const myContract = new Contract(SwapAddress , Swapabi , signer);
      const address = await signer.getAddress();

  const tx = await myContract.claimMonthlyReward();
  await tx.wait();
      window.location.replace("/");

  }catch(err){
    console.error(err);
          if (err.message.includes('execution reverted: Claim not available yet')) {
        window.alert('You havnt reached the claim date yet!');
      } 

  }

}
const claimDates = async() =>{
  try{
      const provider = await getSignerOrProvider();
      const myContract = new Contract(SwapAddress , Swapabi , provider);
      const signer = await getSignerOrProvider(true);
      const address = await signer.getAddress();

  const tx = await myContract.userDetails(address);
    setMyArray1(tx.times);
  }catch(err){
    console.error(err);
  }
}
  function renderLinksTenTimes() {
  const links = [];
  for (let i = 0; i <= userMonths; i++) {
    links.push(<a href="#" key={i}>{i} <br/></a>);
  }
  return <div>{links}</div>;
}
  const approval= async() =>{
    try{
      const provider = await getSignerOrProvider(true);
      const contract = new Contract(Token2Address, Token2abi, provider);
      const amount= ethers.utils.parseEther(token1balance);
      const balance = await contract.approve(SwapAddress ,amount);
      await balance.wait();
      setEnable(true);

    }catch(err){
      console.error(err);
    }
  }
    const BlanceToken1 = async() =>{
    try{
            const signer = await getSignerOrProvider(true);
      const address = await signer.getAddress();
      const provider = await getSignerOrProvider();
      const contract = new Contract(Token2Address, Token2abi, provider);
      const balance = await contract.balanceOf(address);
      settoken1balance(ethers.utils.formatUnits(balance));
      setinput(ethers.utils.formatUnits(balance));


    }catch(err){
      console.error(err);
    }
  }
  const swapToken1withToken2 = async() =>{
    try{
                  const signer = await getSignerOrProvider(true);
    const myContract = new Contract(SwapAddress , Swapabi , signer);
const bigNumberValue = ethers.utils.parseEther(token1balance);
    const _tokenMinted = await myContract.buyTokens(bigNumberValue);
            await _tokenMinted.wait();
      window.location.replace("/");


    }catch(err){
      if (err.message.includes('execution reverted: ERC20: insufficient')) {
        window.alert('ERC20: insufficient allowance , please enter the approved input ');
      } 
      console.error(err);

    }

  }
  const BNBbalance = async() =>{
    try{
            const signer = await getSignerOrProvider(true);
      const address = await signer.getAddress();
    const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/'); // use the appropriate BSC testnet endpoint
const balance = await provider.getBalance(address);
const userbnbBalance = ethers.utils.formatEther(balance);
    setbnbBalance(userbnbBalance);
    }catch(err){
console.error(err);
    }

  }
  console.log(userAddress);
  const connectWallet = async () =>{
    try{
          await getSignerOrProvider();
      setwalletConnected(true);
    }catch(err){
      console.error(err);
    }
  }
  const balanceAndAddress = async() =>{
    if(walletConnected){
    await   getBlanceTokenAmanDevToken();
     await BlanceToken1();
await BNBbalance();
    }
  }
  React.useEffect(()=>{
    if(!walletConnected){
      ModelRef.current = new Web3Modal({
        networks:"arbitrum-goerli",
        providerOptions:{},
        disabledInjectedProvider:false,
      })
      connectWallet();
    }
renderLinksTenTimes();
    renderClaim();
    claimDates();
      balanceAndAddress();
  },[walletConnected]);
  return (
    <>
    <Head>
    <title>Vesting Contract Swap</title>
    </Head>
	  <div class="area" >
</div>

    <header class="text-gray-600 body-font ">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
      <span class=" text-xl">Vesting Contract Swap</span>
    </a>
    <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
    </nav>
    <button onClick={connectWallet} class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"><img className="h-5 w-5 mr-2" src="favicon.png" />{walletConnected ? "Connected" : "Connect Wallet"}
    </button>
  </div>
</header>
    <section class="   body-font relative middle_box">
  <div class="container mx-auto">
    <div class="flex flex-col w-full mb-8">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white "> Vesting Contract Swap</h1>
    </div>
  <div class="row">
 <div class="box-50">
  <div class="box_white">
  
    <form >
                                        <div class="">Wallet Address :<span>{userAddress}</span></div>
	            <div class="value_top">
                                <div class="">Token Balance: <span>{token1balance}</span> ABC</div>
                   </div>
      <div class="">
        <div class="p-2 w_1_box mb-3">
            <label for="name" class=" text-gray-600"><b>Old Dhorni Dao</b></label>
			 <div class="input_box">
			</div>

        </div>
    { !Enable ? 
            <div class="p-2 w-full">
              <button type="button" onClick={approval} class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Approve</button>
        </div>

      : 

        <div class="p-2 w-full">
          <button type="button" onClick={swapToken1withToken2}   class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"> Swap To Stake</button>
        </div>
    }
        
      </div>
    </form>
  </div>
  </div>
  
  <div class="box-50">

					
  </div>
  </div>
  </div>
</section>

<footer class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap md:text-left text-center order-first">
      <div class="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">S.NO</h2>
        <nav class="list-none mb-10">
        <li>
  {renderLinksTenTimes()}
        </li>
      </nav>
    </div>
        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
      <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Amount</h2>
      <nav class="list-none mb-10">
  <li>    {renderAmount()}
</li>



        </nav>
      </div>
          <div class="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Claim Date</h2>
        <nav class="list-none mb-10">
    <div>
    {myArray1.map((timestamp, index) => (
      <>
  <li >{new Date(timestamp * 1000).toLocaleString()}</li>
      </>
))}
    { date ?
                    <li>{new Date(date.getTime()).toLocaleString()}</li>

        :
<li>
        </li>

    }


        </div>
      </nav>
    </div>
      <div class="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Action</h2>
        <nav class="list-none mb-10">
    <div>
    {myArray.map((value, index) => (
      <>
      { !value == true ?
      <button onClick={claimMoney} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 px-4 border border-blue-500 hover:border-transparent rounded">
  Claim
</button>
:
        <button class="bg-blue-500 text-white font-bold py-0 px-4 rounded opacity-50 cursor-not-allowed">
Claimed 
</button>

      }

          <li className="py-1" key={index}></li>
      </>
        ))}

    </div>
          { lastuserAmount ?
      <button onClick={claimlastMoney} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 px-4 border border-blue-500 hover:border-transparent rounded">
  Claim
</button>
: lastused?
        <button class="bg-blue-500 text-white font-bold py-0 px-4 rounded opacity-50 cursor-not-allowed">
Claimed 
</button>
:
            <li></li>
      }
        </nav>
      </div>
    </div>
  </div>
  <div class="bg-gray-100">
    <div class="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
      <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <span class="ml-3 text-xl"> Made with 💜 by Technoloader</span>
      </a>
    </div>
  </div>
</footer>
    </>
  )
}
