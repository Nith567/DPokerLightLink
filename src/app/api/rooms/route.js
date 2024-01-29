import prismadb from '@/lib/db';

export async function GET() {
  const createdRoom = await prismadb.gameRoom.create({
    data: {},
  })

  return new Response(createdRoom.id)
}
