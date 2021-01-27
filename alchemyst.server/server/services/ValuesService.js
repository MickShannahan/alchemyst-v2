import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import socket from './SocketService'

class ValuesService {
  socketTest() {
    socket.messageRoom('general', 'THANKS', { payload: 1 })
  }

  async find(query = {}) {
    const values = await dbContext.Values.find(query)
    return values
  }

  async findById(id) {
    const value = await dbContext.Values.findById(id)
    if (!value) {
      throw new BadRequest('Invalid Id')
    }
    return value
  }
}

export const valuesService = new ValuesService()
