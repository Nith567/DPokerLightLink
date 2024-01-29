import { NextResponse } from 'next/server';
import prismadb from '@/app/lib/db';
export async function GET(req,{params}) {

  try {

    const { roomId } = params;
    const existingRoom = await prismadb.gameRoom.findUnique({
       where:{
            roomId:id
       }
    });
    if (!existingRoom) {
        return new Response("Room not found", { status: 404 });
      }

if (existingRoom.player2Id) {
    return new Response("Room is already full", { status: 400 });
  }
     return new Response(existingRoom.isVacant)
  } catch (error) {
    console.error('While creating room:', error);
    return new Response('Internal room  Server Error', { status: 500 });
  }
}
