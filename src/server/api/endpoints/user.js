
import ServiceManager from '../services/SvcManager'
import { serverConfig as config } from 'c0nfig'
import express from 'express'

module.exports = function() {

  var router = express.Router()

  /////////////////////////////////////////////////////////////////////////////
  // GET /user
  // Get current user
  //
  /////////////////////////////////////////////////////////////////////////////
  router.get('/', async (req, res) => {

    try {

      var authSvc = ServiceManager.getService(
        'AuthSvc');

      var token = await authSvc.getToken(req)

      var dmSvc = ServiceManager.getService('DMSvc')

      var response = await dmSvc.getUser(
        token.access_token)

      res.json(response)
    }
    catch (ex) {

      res.status(ex.statusCode || 500)
      res.json(ex)
    }
  })

  return router
}