import { Auth0Provider } from '@bcwdev/auth0provider'
import { valuesService } from '../services/ValuesService'
import BaseController from '../utils/BaseController'

export class ValuesController extends BaseController {
  constructor() {
    super('api/values')
    this.router
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:num', this.socketTest)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      return res.send(['value1', 'value2'])
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(req.body)
    } catch (error) {
      next(error)
    }
  }

  async socketTest(req, res, next) {
    try {
      valuesService.socketTest()
      res.send('neeeeeet')
    } catch (error) {
      next(error)
    }
  }
}
