import { useRouter } from 'next/router';
import { NextResponse } from 'next/server';
import prismadb from '@/app/lib/db';
export async function GET({params}) {
  try {
    console.log("suck ", params)
    const body = await req.json();
    const {roomId} = body;
    const existingRoom = await prismadb.gameRoom.findUnique({
       where:{
          id:roomId
       }
    });
    if (!existingRoom) {
        return new NextResponse("Room not found bro", { status: 404 });
      }

     return new Response(existingRoom.isVacant)
  } catch (error) {
    console.error('While creating why do people lroom profile :', error);
    return new NextResponse('Internal room  Server Error', { status: 500 });
  }
}

// export async function PATCH({params}) {

//     try {
//         console.log("sulli ", params)
//         const { profile, roomId } = params;
//       const existingRoom = await prismadb.gameRoom.update({
//         where: { id: roomId },
//         data: {
//           player2Id: profile,
//         }
//       });
//        return new NextResponse.json(existingRoom)
//     } catch (error) {
//       console.error('While creatinljlkjlkg profile lo room:', error);
//       return new NextResponse('Internal room  Server Error', { status: 500 });
//     }
//   }
  