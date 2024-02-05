'use client'
import { v4 as uuidv4 } from 'uuid';
import  { toast }  from 'react-hot-toast';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import {utils} from "ethers"
import { FC } from 'react'
import { useSession } from 'next-auth/react';
import {abi} from "@/contract/abi"
import useMoonSDK  from "@/hooks/moon"
const GameInput= ({ roomId,count }) => {
  const router = useRouter();
  const [players, setPlayers] = useState(null);
  const [bet, setBet] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [balValue, setbalValue] = useState('');
  const [bet2, setBet2] = useState(null);
  const [diceRolls, setDiceRolls] = useState({});
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


  const handleInputChange3 = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputChange = (event) => {
    setBet(Number(event.target.value));
  };
  const handleInputChange2 = (event) => {
    setBet2(Number(event.target.value));
  };

  const processtrans = async (methods,player1Id,gamemethodtype) => {
    console.log("so s", player1Id, player2Id)
    const contractAddress='0x3Ea718B21872168B3BFe719DD464f6ae15567a95'
    moon.updateToken(session?.accessToken);
    const contract = new ethers.Contract(contractAddress, abi);
    const method = methods;
    const accountName =player1Id;
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
      return tx.data.data.data;
    } 
    const sendMessage = async (text) => {
      await axios.post('/api/gameroom', {text,roomId});
      router.refresh();
    };

    
    const startRound=async()=>{
  const txhash= await processtrans('startRound',player1Id,[count+1, player1Id ,'0x1a8e16e7b0d6023cc9c106154c38ff5c721c6da7' ])
   setTimeout(async () => {
    await sendMessage(`Round Started${txhash}`);
  }, 4000); 
    }

  const placeBet=async(plyr,tokenAmount)=>{
     const decimalPlaces = 18;
     const rawAmount = utils.parseUnits(tokenAmount.toString(), decimalPlaces);
   const txhash=await processtrans('placeBet',plyr,[count+1,rawAmount ])
   console.log("bab , " ,txhash)
   const numberOfTokens = await decodesPoolPrize();
   await sendMessage(`sent tokens so total pool award is ${numberOfTokens} successfully transaction ${txhash}`);
     }



 const decodesPoolPrize = async () => {
  const smart='0x3Ea718B21872168B3BFe719DD464f6ae15567a95'
  const providerUrl = 'https://replicator.pegasus.lightlink.io/rpc/v1'; 
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const contract = new ethers.Contract(smart, abi,provider);
try {
  const result = await contract.getPoolPrize(count+1);
  console.log('Result:is burra ', result._hex);
  const hexValue = result._hex;
  const strippedHex = hexValue.replace("0x", ""); 
  const decimalValue = BigInt(`0x${strippedHex}`); 
  const numberOfTokens = decimalValue / (10n**18n);
  console.log(numberOfTokens.toString());
  console.log("Number of tokens: " + numberOfTokens);
  return numberOfTokens;
} catch (error) {
  console.error('Error:', error);
}
};
 
const RevertBet=async(plyr)=>{
 const d= await processtrans('RevertBet',player1Id,[count])
 await sendMessage("reverted by the ${plyr}")
  } 

  const requestDiceRoll=async(size,plyr)=>{
   const txhash=await processtrans('makeRequestrollDice',plyr,[count+1,size])
   setTimeout(async () => {
    const hexNumbers = await decodesdiceroll(plyr);
    const arrays = hexNumbers.map((num) => num.toString().replace(/^0+/, ''));
    setDiceRolls((prevRolls) => ({
      ...prevRolls,
      [plyr]: { size, diceNumbers: arrays, txhash },
    }));
    console.log(hexNumbers);
    const numbersAsString = hexNumbers.join(',');
    await sendMessage(`Got rolling numbers: ${numbersAsString}  for player ${plyr} (Size: ${size}) successfully. Txn: ${txhash}`);
  }, 50000);
   }

const decodesdiceroll = async (player) => {
  const smart='0x3Ea718B21872168B3BFe719DD464f6ae15567a95'
  const providerUrl = 'https://replicator.pegasus.lightlink.io/rpc/v1'; 
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const contract = new ethers.Contract(smart, abi,provider);
try {
  const result = await contract.getPlayerDiceRolls(count+1,player);
  console.log("burra , ",result)
  const hexNumbers = result.map(item => item._hex.slice(2));
  console.log('Result:', hexNumbers);
  return hexNumbers;
} catch (error) {
  console.error('Error:', error);
}
};

const decodesgetScore = async () => {
  const smart='0x3Ea718B21872168B3BFe719DD464f6ae15567a95'
  const providerUrl = 'https://replicator.pegasus.lightlink.io/rpc/v1'; 
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const contract = new ethers.Contract(smart, abi,provider);
try {
  const result = await contract.getScore(count+1);
  const hexNumbers = result.map(item => item._hex.slice(2));
  console.log('Hex Numbers:', hexNumbers);
  return hexNumbers;
} catch (error) {
  console.error('Error:', error);
}
};

const RerollOnce=async(plyr,arr)=>{
  const txhash=await processtrans('RerollOnce',plyr,[count+1,arr ])
  console.log("bab , " ,txhash)
  await sendMessage(`sent tokens so total pool award is successfully transaction ${txhash}`);
    }

const handleSubmit3 =async (player1Id) => {
  const inputArray = inputValue.split(',').map(Number);
  console.log("kuu ",inputArray)
 await  RerollOnce(player1Id,inputArray)
  let cnt = inputArray.filter(x => x === 1).length;
 await requestDiceRoll(cnt,player1Id)
};

const determineWinner=async()=>{
 const txhash= await processtrans('determineWinner',player1Id,[count+1]);
 const hexNumbers=await decodesgetScore(count+1);
 await sendMessage(`sent tokens so total pool award is ${hexNumbers} successfully transaction ${txhash}`);
  }

    const getTkBalance = async (accountNames) => {
      moon.updateToken(session?.accessToken);
    const transactionData = {
      chain_id: "1891",
     EOA :true,
    gas: '200000',
     value:"0",
     encoding:"utf-8",
     broadcast:true,
  contract_address: "0x3Ea718B21872168B3BFe719DD464f6ae15567a95",
    };
    const accounts =await moon?.getErc20SDK().balanceOfErc20(accountNames,transactionData);
    console.log(accounts?.data.data)
    setbalValue(accounts?.data.data)
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
    <div>
    </div>


    <div className='flex mx-auto my-2'>
      Start Round
      {session?.user?.email === players?.player1?.email && (
        <div>
          Your token balance: {balValue}
      <button  className='bg-slate-400'  onClick={startRound}>Start Round</button>
      <label htmlFor="betInput">Enter Bet:</label>
      <input
        type="number"
        id="betInput"
        value={bet}
        onChange={handleInputChange}
      />
      <p>Current Bet: {bet}</p>
      <button  className='bg-orange-600 m-2'  onClick={()=>placeBet(player1Id,bet)}>place bet</button>
      <button  className='bg-green-400  m-3'  onClick={()=>requestDiceRoll(5,player1Id)}>Roll the dice</button>
      <button  className='bg-green-400  m-3'  onClick={()=>determineWinner()}>determineWinner</button>
<div>
      <label htmlFor="diceInputs">Enter numbers (comma-separated):</label>
      <input
        type="text"
        id="diceInputs"
        value={inputValue}
        onChange={handleInputChange3}
      />
      <button onClick={()=>handleSubmit3(player1Id)}>Reroll again</button>
</div>

      <button  className='bg-green-600  m-5'  onClick={()=>getTkBalance}>getbalance</button>     
      <button  className='bg-green-600  m-5'  onClick={()=>decodesPoolPrize}>GetPool prize</button>
      <button  className='bg-green-600  m-5'  onClick={()=>decodesgetScore}>GetScoreCombined</button>
      <button  className='bg-green-600  m-5'  onClick={()=>decodesdiceroll}>YourDiceRoll</button>
      <button  className='bg-green-600  m-5'  onClick={()=>RevertBet(player1Id)}>YourDiceRoll</button>
      </div>
    )}
    <div>

    {Object.keys(diceRolls).map((playerId) => (
      <p key={playerId}>
        {`Player ${playerId} rolled ${diceRolls[playerId].diceNumbers}  for size ${diceRolls[playerId].size}. Txn: ${diceRolls[playerId].txhash}`}
 { diceRolls[playerId].diceNumbers}
      </p>
    ))}
  </div>
      {session?.user?.email === players?.player2?.email && (
        <div>
             Your token balance: {balValue}
      <label htmlFor="betInput">Enter Bet:</label>
      <input
        type="number"
        id="betInput"
        value={bet2}
        onChange={()=>handleInputChange2}
      />

      <p>Current Bet: {bet2}</p>
      <button  className='bg-orange-600 m-2'  onClick={()=>placeBet(player2Id,bet2)}>place bet</button>
      <button  className='bg-green-400  m-3'  onClick={()=>requestDiceRoll(5,player2Id)}>Roll the dice</button>
      <div>
      <label htmlFor="diceInputs">Enter numbers (comma-separated):</label>
      <input
        type="text"
        id="diceInputs"
        value={inputValue}
        onChange={handleInputChange3}
      />
      <button onClick={()=>handleSubmit3(player1Id)}>Reroll again</button>
         </div>
      <button  className='bg-green-600  m-5'  onClick={()=>rollonce()}>ReRoll Again</button>

      <button  className='bg-green-600  m-5'  onClick={()=>getTkBalance}>getbalance</button>
      <button  className='bg-green-600  m-5'  onClick={()=>decodesgetScore}>GetScoreCombined</button>
      </div>
    )}
  </div>
    </div>
  
  );
}

export default GameInput
