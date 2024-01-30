import prismadb from '@/app/lib/db';
import { pusherServer } from '@/lib/pusher'

export async function POST() {
  const { text, roomId } = await req.json()

  pusherServer.trigger(roomId, 'incoming-message', text)

  await prismadb.game.create({
    data: {
      text,
      gameRoomId: roomId,
    },
  })

  return new Response(JSON.stringify({ success: true }))
}
