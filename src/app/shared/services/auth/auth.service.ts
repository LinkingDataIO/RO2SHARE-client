import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private authUrl = `${environment.serviceUrl}/auth`;  // URL to web api

  constructor(private http: Http) { }

  auth(code: string): Promise<Object> {
    const url = `${this.authUrl}/login/?orcid_auth_code=${code}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Object)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
