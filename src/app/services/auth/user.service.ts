import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private oauthService: OAuthService) { }

  getUserInfo(): Promise<any> {
    const userInfoUrl = "https://localhost:9443/oauth2/userinfo"; // Obtiene la URL del punto final UserInfo
    const accessToken = this.oauthService.getAccessToken(); // Obtiene el token de acceso del usuario
    console.log(accessToken);

    // Configura los encabezados HTTP con el token de acceso
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    // Realiza una solicitud HTTP GET al punto final UserInfo con los encabezados configurados
    return this.http.get(userInfoUrl, { headers }).toPromise();
  }
}
