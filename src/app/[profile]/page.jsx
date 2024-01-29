import React from 'react'
import { useRouter } from 'next/navigation'
function page({children,params}) {

 const createRoom = async () => {
    const router = useRouter()
        const res = await fetch('/api/rooms/create')
        const roomId = await res.text()
        router.push(`/room/${roomId}`)
      }
    
     const joinRoom = async (roomId) => {
        router.push(`/room/${roomId}`)
      }

      
  return (
    <div>
        page  
        <br></br>
        {params.profile}
        </div>
  )
}

export default page