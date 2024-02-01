'use client'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { FC } from 'react'

const GameInput= ({ roomId }) => {
  const [players, setPlayers] = useState(null);
  let input = ''

  const sendMessage = async (text) => {
    await axios.post('/api/gameroom', { text, roomId })
  }

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(`/api/rooms/${roomId}`);
      const data = await response.data; // Assuming the data is directly available as an object
      setPlayers(data);
      console.log("Fetched Players:", data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  useEffect(() => {
    // Fetch players when the component mounts
    fetchPlayers();
  }, [roomId]); 
  
  return (
    <div className='flex gap-2'>
    Play the game-from GAMEINPUT JSXSDFDSF
    <div>
      <h1>Room Page</h1>
      <h2>Game Room Details</h2>
      Vacant: {players?.player1Id}
      ID: {players?.id}
      Player 1 Email: {players?.player1?.email}
      Player 2 Email: {players?.player2?.email}
    </div>
    <button onClick={fetchPlayers}>ClicksBro</button>
  </div>
  );
}

export default GameInput
