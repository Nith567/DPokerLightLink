import { NextResponse } from 'next/server';
import prismadb from '@/app/lib/db';
export async function GET({params}) {
    const {roomId}=params;
  try {


  // Fetch the GameRoom data based on the roomid
  const gameRoom = await db.gameRoom.findUnique({
    where: { id: roomid },
    include: {
      player1: { select: { email: true } },
      player2: { select: { email: true } },
    },
  });

  if (!gameRoom) {
    return res.status(404).json({ error: 'Room not found' });
  }
  const { player1, player2 } = gameRoom;
     return new Response(gameRoom)
  } catch (error) {
    console.error('While creating room:', error);
    return new Response('Internal room  Server Error', { status: 500 });
  }
}
