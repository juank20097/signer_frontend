import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakRoles } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 username: string = "";

  public Logueado = false;
		  public perfilUsuario: KeycloakProfile | null = null;
		  
		  constructor(private readonly keycloak: KeycloakService) {}
		 
		  public async ngOnInit() {
		    this.Logueado = await this.keycloak.isLoggedIn();
		    type rolesUsuarios = Array<{id: number, text: string}>;
		    if (this.Logueado) {
		      	this.keycloak.loadUserProfile().then(userProfile => {
				this.username = userProfile.firstName + ' '+userProfile.lastName || ''; 
			  });
		    }
		  }

		  public iniciarSesion() {
		    this.keycloak.login();
		  }

		  public cerrarSesion() {
		    this.keycloak.logout();
		  }
}
