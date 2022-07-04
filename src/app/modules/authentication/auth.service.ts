import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CredentialsService } from '../../@shared/services/credentials/credentials.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/@shared/services/api/api.service';
import { IUser } from '@app/models/iuser';

export interface LoginContext {
  username: string;
  password: string;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiSrvc: ApiService,
    private credentialsService: CredentialsService
  ) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<any> {
    return this.apiSrvc.post('login', context).pipe(tap((e)=>{
      if(e) this.onAuthenticate(e);
    }));
  }

   /**
   * Create the user.
   * @param context The signup parameters.
   * @return The user credentials.
   */
  signup(context:IUser) {
    return this.apiSrvc.post<IUser>('signup', context).pipe(tap((e)=>{
      if(e) this.onAuthenticate(e);
    }));
  }

  private getReturnUrl() {
    return this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onAuthenticate(credentials:IUser){
    this.credentialsService.setCredentials(credentials)
    this.router.navigateByUrl(this.getReturnUrl())
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
