import prismadb from '@/app/lib/db';
import GameInput from '@/components/GameInput';
import Messages from '@/components/Messages';

async function page({params}) {

      const {roomId}=params;

  const existingMessages = await prismadb.game.findMany({
    where: {
      gameRoomId: roomId,
    },
  })
  const gcount = async () => {
    const count = await prismadb.gameRoom.count();
    const incrementedCount = count + 1;
    console.log(`Number of game rooms: ${incrementedCount}`);
    return incrementedCount;
  };


  const serializedMessages = existingMessages.map((message) => ({
    text: message.gamesids,
    id: message.id,
  }))
  return (
    <div>
      const 

      <div>
      <GameInput roomId={roomId} count={await gcount()} />

      {/* <Messages roomId={roomId} initialMessages={serializedMessages} /> */}

   
    </div>
    </div>
  )
}

export default page