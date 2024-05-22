import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8081',
  realm: 'firmaec',
  clientId: 'firmaec_app'
};

export default keycloakConfig;
