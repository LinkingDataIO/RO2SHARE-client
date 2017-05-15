import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ROService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private roUrl = 'http://localhost:8080/ro';  // URL to web api

    constructor(private http: Http) { }

    claim(orcid: string, ro:Object): Promise<Object> {
      ro['orcid'] = orcid;
      const url = `${this.roUrl}/claim`;
      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      return this.http.post(url, JSON.stringify(ro), {headers: this.headers})
        .toPromise()
        .then(response => response.json() as Object)
        .catch(this.handleError);
    }


    mine(orcid: string): Promise<Array<any>> {
      const url = `${this.roUrl}/mine?orcid=${orcid}`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json() as Array<any>)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}