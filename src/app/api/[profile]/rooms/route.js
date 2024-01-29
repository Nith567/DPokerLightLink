import { NextResponse } from 'next/server';
import prismadb from '@/app/lib/db';
export async function POST(req,{params}) {
  try {
    const { profile } = params;
    const createdRoom = await prismadb.gameRoom.create({
      data: {
        player1Id:profile
      }
    });

    return new Response(createdRoom.id);
  } catch (error) {
    console.error('zxErrosdfrwhy creating room:', error);
    return new Response('sdfInternalu room  Server Error', { status: 500 });
  }
}
