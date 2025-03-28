import {register} from '../controllers/user.js'
import {dashboardSummary} from '../controllers/dashboard.js'
import { validAuth } from '../middleware/auth.js'

export default  {
  urlPrefix: "/user",
  paths: {
    createUser:{
      path: "/create",
      method: "POST",
      handler: register,
      validations: []
    },
    updateUser:{
      path: "/update",
      method: "POST",
      handler: register,
      validations: []
    },
    summary:{
      path: "/summary",
      method: "GET",
      handler: dashboardSummary,
      validations: [validAuth]
    }
  }
};
