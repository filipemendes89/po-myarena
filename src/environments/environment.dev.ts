import { auth_config } from "src/auth_config"

export const environment = {
  production: false,
  auth: {
    domain: auth_config.domain,
    clientId: auth_config.clientId,
    redirectUri: window.location.origin,
  },
  apiUrl: 'http://localhost:7071/api',
  apiCode: ''
};