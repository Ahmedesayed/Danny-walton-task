import { Injectable } from '@angular/core';
import { StorageService } from '@app/@shared/services/storage/storage.service';
import { StorageKey } from '@app/@shared/services/storage/storage-key';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
  companyId: string;
  refreshToken: string;
  companyName: string;
  image?: string;
  phoneNumber: string;
  email: string;
}

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  private _credentials: Credentials | null = null;

  constructor(private storageService: StorageService) {
    const savedCredentials = <Credentials>(
      storageService.getData(StorageKey.credentials)
    );
    if (savedCredentials) {
      this._credentials = savedCredentials;
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;
    if (credentials) {
      this.storageService.setData(StorageKey.credentials, credentials);
    } else {
      this.storageService.removeItem(StorageKey.credentials);
    }
  }
}
