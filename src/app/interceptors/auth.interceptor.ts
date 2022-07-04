import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/@shared/services/credentials/credentials.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private credentialsService: CredentialsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.credentialsService.credentials?.id;
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      setHeaders: {
        'x-access-token': `${authToken}`,
      },
    });
    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
