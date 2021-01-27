import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ValueService {
  async buttonClick(buttonNum) {
    try {
      const res = await api.get('api/values/' + buttonNum)
      logger.log(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}

export const valueService = new ValueService()
