import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private alertSrvc: AlertService,
  ) {}

  upload(path: string, file: File, headers: HttpHeaders) {
    const req = new HttpRequest('PUT', path, file, {
      reportProgress: true,
      headers,
    });
    return this.http.request<Blob>(req).pipe(
      map((event) => this.getEventMessage(event, file)),
      catchError((error) => this.handleError(error))
    );
  }

  delete<T>(path: string, body = {}) {
    return this.http
      .delete<T>(environment.apiUrl + path, { body })
      .pipe(catchError((error) => this.handleError(error)));
  }

  put<T>(path: string, params = {}) {
    return this.http
      .put<T>(environment.apiUrl + path, params)
      .pipe(catchError((error) => this.handleError(error)));
  }

  post<T>(path: string, params = {}) {
    return this.http
      .post<T>(environment.apiUrl + path, params)
      .pipe(catchError((error) => this.handleError(error)));
  }

  get<T>(path: string, data = {}) {
    let params = new HttpParams({
      fromString: decodeURIComponent(new URLSearchParams(data).toString()),
    });
    return this.http
      .get<T>(environment.apiUrl + path, { params })
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      this.alertSrvc.showToast({
        severity: 'error',
        summary: 'Failed! Please try again later.',
        detail: error?.error,
      });
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error?.status}, body was: `,
        error?.error
      );
      this.alertSrvc.showToast({
        severity: 'error',
        summary: 'Failed!',
        detail: error?.error?.error,
      });
    }
    // Return an observable with a user-facing error message.
    return throwError(() => 'Something bad happened; please try again later.');
  }

  /** Return distinct message for sent, upload progress, & response events */
  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return 0;
      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(
          (100 * event.loaded) / (event.total ?? 0)
        );
        return percentDone;

      case HttpEventType.Response:
        return 100;

      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }


}
