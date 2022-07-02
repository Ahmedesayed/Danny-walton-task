import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/modules/authentication/credentials.service';
import { environment } from '@env/environment';
import { AuthService } from '../modules/authentication/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private credentialsService: CredentialsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.credentialsService.credentials?.token;
    let isVendorApiReq = req.url.includes(environment.apiUrl);

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // send cloned request with header to the next handler.
    return next.handle(isVendorApiReq ? authReq : req);
  }
}
