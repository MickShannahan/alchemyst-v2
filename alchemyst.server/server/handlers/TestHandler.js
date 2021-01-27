import { SocketHandler } from '../utils/SocketHandler'

export class TestHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   * @param {{ id: string; email: string; }} user
   * @param {{ id: string; email: string; }} profile
   */
  constructor(io, socket, user, profile) {
    super(io, socket, user, profile)
    this
      .on('TEST_EVENT', this.testEvent)
      .on('ANOTHER_TEST_EVENT', this.anotherTestEvent)
      .on('join:room', this.onJoinRoom)
  }

  async testEvent(payload) {
    this.socket.emit('THANKS', {
      user: this.user,
      profile: this.profile,
      payload
    })
  }

  async anotherTestEvent(payload) {
    this.socket.emit('THANKS_AGAIN', {
      user: this.user,
      profile: this.profile,
      payload
    })
  }

  async onJoinRoom(payload) {
    try {
      // you should probably ensure the user has access to this boardId
      this.socket.join(payload)
      this.socket.emit('joined:room', {
        user: this.user,
        profile: this.profile,
        room: payload
      })
    } catch (e) {
      this.socket.emit('error', e)
    }
  }
}
