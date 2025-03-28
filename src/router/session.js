import {login} from '../controllers/session.js'

export default  {
  urlPrefix: "/session",
  paths: {
    loginUser:{
      path: "/login",
      method: "GET",
      handler: login,
      validations: []
    }
  }
};