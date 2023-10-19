import { auth_config } from "src/auth_config"

export const environment = {
  production: true,
  auth: {
    domain: auth_config.domain,
    clientId: auth_config.clientId,
    redirectUri: window.location.origin,
  },
  apiUrl: 'https://myarenaapi.azurewebsites.net/api'
};