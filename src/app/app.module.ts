import { APP_INITIALIZER,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppLayoutModule } from './layout/app.layout.module'; 
import { AppRoutingModule } from './app-routing.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';


/*PrimeNG*/
import { ChartModule } from 'primeng/chart'
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';

/*Components*/
import { AppComponent } from './app.component';
import keycloakConfig from './keycloak/keycloak.conf';
import { UploadComponent } from './components/upload/upload.component';


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: keycloakConfig,
      initOptions: {
        onLoad: 'login-required', // Other options: 'check-sso', 'login-required'
        checkLoginIframe: true,
      },
      enableBearerInterceptor:true
    });
}

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule, 
    ChartModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    MessagesModule, 
    MessageModule,
    ToastModule,
    KeycloakAngularModule,
    ImageModule,
    FileUploadModule,
  ],
  providers: [MessageService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
