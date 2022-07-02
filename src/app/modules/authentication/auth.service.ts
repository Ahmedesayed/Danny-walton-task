import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CredentialsService } from './credentials.service';
import { ActivatedRoute, Router } from '@angular/router';
import { saveAs } from 'file-saver';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private credentialsService: CredentialsService
  ) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<any> {
    const url = '/org/token';
    const body = new URLSearchParams();
    body.set('username', context.username);
    body.set('password', context.password);
    body.set('grant_type', 'password');
    body.set('response_type', 'token id_token');

    return this.httpClient.post(url, body.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });
  }

  signup(data:string) {
    console.log(data)
    saveAs(data, "users.json")
  }

  private getReturnUrl() {
    return this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout() {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    this.router.navigateByUrl('/auth');
  }
}
