'use client'
import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation'

function page({children,params}) {
  let roomIdInput = ''
    const router = useRouter()

const joinRoom = async (roomId) => {
  try {
    let response = await axios.patch(`/api/rooms/${roomId}`, { profile: params.profile });
    router.push(`/room/${roomId}`)
    console.log("Response data: ra ", response.data);

  } catch (error) {
    // Log and handle any errors that occur during the request
    console.error("Error joining room:", error);

    if (error.response && error.response.status === 404) {
      console.error("Room not found. Make sure the roomId is correct.");
    }
  }
};
 const createRoom = async () => {
    const response = await axios.post(`/api/${params.profile}/room`);
    const roomId = await response.data;
        router.push(`/room/${roomId}`)
      }
  
  return (
    <div>
        page  
        <br></br>
        {params.profile}
        <button className="bg-slate-400 m-4" onClick={createRoom}>Create room</button>
<div >
  From low - high ranking
nothing Nothing — five mismatched dice forming no sequence longer than four.
pair Pair — two dice showing the same value.
2 pairs Two Pairs — two pairs of dice, each showing the same value.
nothing Three-of-a-Kind — three dice showing the same value.
5 high straight Five High Straight — dice showing values from 1 through 5, inclusive.
6 high straight Six High Straight — dice showing values from 2 through 6, inclusive.
full house Full House — Pair of one value and Three-of-a-Kind of another.
4 of a kind Four-of-a-Kind — four dice showing the same value.
5 of a kind Five-of-a-Kind — all five dice showing the same value.
</div>
        <div className='flex gap-2 m-3'>
        <input
          type='text'
          onChange={({ target }) => (roomIdInput = target.value)}
          className='border border-zinc-300'
        />

        <button onClick={() => joinRoom(roomIdInput)}>Join room</button>
      </div>

        </div>
  )
}

export default page