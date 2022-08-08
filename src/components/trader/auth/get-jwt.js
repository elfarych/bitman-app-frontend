import axios from 'axios'
import config from 'src/config'
import notifier from 'src/utils/notifier'
import errorHandler from 'src/utils/error-handler'

export default async function createJWT (data) {
  let jwt
  try {
    jwt = await axios
      .post(`${config.socialServerURI}/auth/jwt/create/`, {
        ...data
      })
      .then(res => res.data.access)
      .catch(res => notifier(res.message || 'Error.', 'negative'))
  } catch (e) {
    errorHandler(e)
  }

  if (jwt) {
    localStorage.setItem('jwt', jwt)
    return jwt
  }
}
