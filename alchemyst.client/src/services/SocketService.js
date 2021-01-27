
import { addOrUpdate, AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()

    this
      .on('create:value', this.onBid)
      .on('update:value', this.onBid)
      .on('THANKS', this.socketTest)
      .on('joined:room', this.onJoined)
  }

  authenticate(bearerToken) {
    this.socket.emit('authenticate', bearerToken)
  }

  onBid(item) {
    addOrUpdate(AppState.items, item)
  }

  socketTest(payload) {
    logger.log('socket test great success', payload)
  }

  onJoined(payload) {
    logger.log(payload)
  }
}

export const socketService = new SocketService()
