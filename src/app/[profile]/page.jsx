'use client'
import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation'


function page({children,params}) {
    // const params = useParams();
    const router = useRouter()
    let game=1;

 const createRoom = async () => {
    game++;
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

        </div>
  )
}

export default page