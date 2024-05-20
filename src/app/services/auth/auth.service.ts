import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { UserService } from '../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo: any;

  constructor(private oauthService: OAuthService, private userService: UserService) {
    this.configureOAuth();
  }

  private configureOAuth(): void {
    const authConfig: AuthConfig = {
      issuer: 'https://localhost:9443/oauth2/token', // URL del servidor de autorización de WSO2 IS
      strictDiscoveryDocumentValidation: false,
      clientId: 'fJVP8fhHJgkNOvjCfJ_D9Le_Z0sa', // ID de cliente registrado en WSO2 IS
      redirectUri: 'http://localhost:4200/upload', // URL de redirección después de la autenticación
      scope: 'openid profile email', // Ámbitos solicitados
      responseType: 'code', // Tipo de respuesta esperada (authorization code flow)
    };

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin(); // Cargar el documento de descubrimiento y realizar el inicio de sesión
  }

  login(): void {
    this.oauthService.initImplicitFlow(); // Iniciar el flujo de autenticación implícito
  }

  logout(): void {
    this.oauthService.logOut(); // Cerrar sesión
  }

  isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken(); // Verificar si el token de acceso es válido
  }

  fetchUserInfo() {
    this.userService.getUserInfo()
      .then(data => {
        this.userInfo = data;
        console.log(this.userInfo); // Muestra la información del usuario en la consola
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
  }
}
