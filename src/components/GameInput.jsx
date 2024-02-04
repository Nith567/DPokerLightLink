'use client'
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { ethers } from "ethers";
import {utils} from "ethers"
import { FC } from 'react'
import { useSession } from 'next-auth/react';
import {abi} from "@/contract/abi"
import useMoonSDK  from "@/hooks/moon"
const GameInput= ({ roomId,count }) => {
  const [players, setPlayers] = useState(null);
  const [sttx,setstx]=useState();
  let input = ''
  const {data: session, status} = useSession();
  const { moon, initialize, disconnect } = useMoonSDK();
  const { updateToken, listAccounts } = useMoonSDK();

  const player1Id = localStorage.getItem('player1Id');
  const player2Id = localStorage.getItem('player2Id');



  const fetchPlayers = async () => {
    try {
      const response = await axios.get(`/api/rooms/${roomId}`);
      const data = await response.data;
      setPlayers(data);
      console.log("Fetched Players:", data);

    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [roomId]); 

  const sendMessage = async (text) => {
    await axios.post('/api/gameroom', { text, roomId })
  }
  const processtrans = async (methods,playerId,gamemethodtype) => {
    const contractAddress='0x3Ea718B21872168B3BFe719DD464f6ae15567a95'
    moon.updateToken(session?.accessToken);
    const contract = new ethers.Contract(contractAddress, abi);
    const method = methods;
    const accountName =playerId;
    const data = contract.interface.encodeFunctionData(method,gamemethodtype );
    console.log("Encoded Transaction Data:", data);
    const transactionData = {
      to:"0x3Ea718B21872168B3BFe719DD464f6ae15567a95",
      data: data,
      chain_id: "1891",
     EOA :true,
    gas: '2000000',
     value:"0",
     encoding:"utf-8",
     broadcast:true,
    };
    const accounts = await moon?.getAccountsSDK().signTransaction(accountName,transactionData)
      console.log(accounts.data.data.transactions[0].raw_transaction);
      const tx = await moon?.getAccountsSDK().broadcastTx(accountName, {
        chainId: '1891',
        rawTransaction:accounts.data.data.transactions[0].raw_transaction
      });
      console.log('Broadcasted Transaction:', tx.data.data.data);
    } 

    const startRound=async()=>{
      processtrans('startRound',player1Id,[count, player1Id ,player2Id ])
      sendMessage("Round Started ")
    }

    const placeBet=async(tokenAmount)=>{
const decimalPlaces = 18;
const rawAmount = utils.parseUnits(tokenAmount.toString(), decimalPlaces);
      processtrans('placeBet',player1Id,[count,rawAmount ]) }

const requestDiceRoll=async()=>{
processtrans('makeRequestrollDice',player1Id,[count,5])
}

const RevertBet=async()=>{
processtrans('RevertBet',player1Id,[count])
}

const decodesdiceroll = async () => {
  console.log('hi , ', player1Id)
  const smart='0x3Ea718B21872168B3BFe719DD464f6ae15567a95'
  const providerUrl = 'https://replicator.pegasus.lightlink.io/rpc/v1'; 
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const contract = new ethers.Contract(smart, abi,provider);
try {

  const result = await contract.getPlayerDiceRolls(count,player1Id);
  const hexNumbers = result.map(item => item.hex);
  console.log('Hex Numbers:', hexNumbers);
  console.log('Result:', result);
} catch (error) {
  console.error('Error:', error);
}
};
const decodesgetScore = async () => {
  console.log('hi , ', player1Id)
  const smart='0x3Ea718B21872168B3BFe719DD464f6ae15567a95'
  const providerUrl = 'https://replicator.pegasus.lightlink.io/rpc/v1'; 
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const contract = new ethers.Contract(smart, abi,provider);
try {

  const result = await contract.getScore(count);
  const hexNumbers = result.map(item => item.hex);
  console.log('Hex Numbers:', hexNumbers);
  console.log('Result:', result);
} catch (error) {
  console.error('Error:', error);
}
};

const rollonce=async(arr)=>{
  processtrans('RerollOnce',player1Id,[count,arr])//[1,0,1,0,1]
  }
  
const determineWinner=async()=>{
  processtrans('determineWinner',player1Id,[count])
  }
  

    const getTkBalance = async () => {
      moon.updateToken(session?.accessToken);
      const accountName = "0xe9031c20e03db454da83526b20455e249141280f";
    const transactionData = {
      chain_id: "1891",
     EOA :true,
    gas: '200000',
     value:"0",
     encoding:"utf-8",
     broadcast:true,
  contract_address: "0x3Ea718B21872168B3BFe719DD464f6ae15567a95",
    };
    const accounts =await moon?.getErc20SDK().balanceOfErc20(accountName,transactionData);
    console.log( accounts?.data.data)
    };

    const decodesPoolPrize = async () => {
      const smart='0x3Ea718B21872168B3BFe719DD464f6ae15567a95'
      const providerUrl = 'https://replicator.pegasus.lightlink.io/rpc/v1'; 
      const provider = new ethers.providers.JsonRpcProvider(providerUrl);
      const contract = new ethers.Contract(smart, abi,provider);
    try {
      
      // const result = await contract.getPlayerDiceRolls(10000,'0x8A0d290b2EE35eFde47810CA8fF057e109e4190B');
      const result = await contract.getPoolPrize(count);
      console.log('Result:', result);
    } catch (error) {
      console.error('Error:', error);
    }
    };



  return (
    <div>
   {localStorage.setItem('player1Id', players?.player1?.eoa)}
   {localStorage.setItem('player2Id', players?.player2?.eoa)}
    {session?.user?.email === players?.player1?.email && (
      <div>
        <h3>Your Informationt:</h3>
        Your Email: {players?.player1?.email}
       plyr1 Your eoa:  {players?.player1?.eoa}
     
      </div>
    )}

<p>Count: {count}</p>
broad
    {session?.user?.email === players?.player2?.email && (
      <div>
        <h3>Your Information:</h3>
        Your Email: {players?.player2?.email}
  Your eoa: {players?.player2?.eoa}
     
      </div>
    )}
    {session?.user?.email !== players?.player1?.email && (
      <div>
        <h3>Opponent's Information:</h3>
        Opponent's Email: {players?.player1?.email}
       play1 Your eoas: {players?.player1?.eoa}
      </div>
    )}

    {session?.user?.email !== players?.player2?.email && (
      <div>
        <h3>Opponent's Information:</h3>
        Opponent's Email: {players?.player2?.email}
      playr2  Your eoasd: {players?.player2?.eoa}
      </div>
    )}
    <div className='flex mx-auto my-2'>
      Start Round
      {session?.user?.email === players?.player1?.email && (
        <div>
      {/* <button  className='bg-slate-600'  onClick={startRound}>Start Round</button> */}
      <button  className='bg-slate-600'  onClick={startRound}>Start Round</button>
      <button  className='bg-orange-600 m-2'  onClick={placeBet}>place bet</button>
      <button  className='bg-green-600  m-5'  onClick={requestDiceRoll}>decodes</button>
      <button  className='bg-green-600  m-5'  onClick={rollonce}>ReRoll Again</button>

      <button  className='bg-green-600  m-5'  onClick={getTkBalance}>getbalance</button>
      <button  className='bg-green-600  m-5'  onClick={decodesPoolPrize}>GetPool prize</button>
      <button  className='bg-green-600  m-5'  onClick={decodesgetScore}>GetScoreCombined</button>
      <button  className='bg-green-600  m-5'  onClick={decodesdiceroll}>YourDiceRoll</button>
      </div>
    )}
  </div>
      {/* <button onClick={() => sendMessage("")}>Send</button>  */}
    </div>
  
  );
}

export default GameInput
