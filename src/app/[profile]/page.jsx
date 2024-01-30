'use client'
import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation'


function page({children,params}) {
  let roomIdInput = ''
    const router = useRouter()


const joinRoom = async (roomId) => {
  const res=  await axios.get(`/api/${params.profile}/rooms/${roomId}`);
const vacant=await res.data;
if(vacant===true){
  let s=await axios.patch(`/api/${params.profile}/rooms/${roomId}`)
       router.push(`/room/${roomId}`)
  }
}
 const createRoom = async () => {
    const response = await axios.post(`/api/${params.profile}/rooms`);
    const roomId = await response.data; // Assuming the server sends back the ro
        router.push(`/room/${roomId}`)
      }
  
  return (
    <div>
        page  
        <br></br>
        {params.profile}
        <button className="bg-slate-600" onClick={createRoom}>Create room</button>

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