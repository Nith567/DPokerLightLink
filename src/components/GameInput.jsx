'use client'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { FC } from 'react'

const GameInput= ({ roomId }) => {
  const [players, setPlayers] = useState({ player1: '', player2: '' });
  let input = ''

  const sendMessage = async (text) => {
    await axios.post('/api/gameroom', { text, roomId })
  }

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`/api/rooms/${roomId}`);
        setPlayers(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    if (roomId) {
      fetchPlayers();
    }
  }, [roomId]);

  return (
    <div className='flex gap-2'>
     Play the game-from GAMEINPUT JSXSDFDSF
     <div>
      <h1>Room Page</h1>
      <p>Room ID: {players.id}</p>
      <p>Player 1: {players.player1.email}</p>
      <p>Player 2: {players.player2.email}</p>
      {/* Display other details as needed */}
    </div>
      <input
        onChange={({ target }) => (input = target.value)}
        className='border border-zinc-300'
        type='text'
      />
      <button onClick={() => sendMessage(input || '')}>send</button>
    </div>
  )
}

export default GameInput
