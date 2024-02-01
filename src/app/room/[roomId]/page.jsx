import prismadb from '@/app/lib/db';
import GameInput from '@/components/GameInput';
import Messages from '@/components/Messages';

async function page({params}) {

const {roomId}=params;


  // const existingMessages = await prismadb.game.findMany({
  //   where: {
  //     gameRoomId: roomId,
  //   },
  // })

  // const serializedMessages = existingMessages.map((message) => ({
  //   text: message.gamesids,
  //   id: message.id,
  // }))
  return (
    <div>
      const 
      room2 {params.roomId} from the playroomMAINID

      <div>
      <GameInput roomId={roomId} />

      {/* <Messages roomId={roomId} initialMessages={serializedMessages} /> */}

   
    </div>
    </div>
  )
}

export default page