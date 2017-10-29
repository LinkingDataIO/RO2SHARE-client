import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DiSCOService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private discoUrl = `${environment.serviceUrl}/disco`;  // URL to web api

    constructor(private http: Http) { }

    create(orcid: string, disco:Object): Promise<Object> {
      disco['orcid'] = orcid;
      
      const url = `${this.discoUrl}/create`;
      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      return this.http.post(url, JSON.stringify(disco), {headers: this.headers})
        .toPromise()
        .then(response => response.json() as Object)
        .catch(this.handleError);
    }


    update(orcid: string, disco:Object): Promise<Object> {
      disco['orcid'] = orcid;
      
      const url = `${this.discoUrl}/update`;
      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      return this.http.post(url, JSON.stringify(disco), {headers: this.headers})
        .toPromise()
        .then(response => response.json() as Object)
        .catch(this.handleError);
    }


    mine(orcid: string): Promise<Array<any>> {
      const url = `${this.discoUrl}/mine?orcid=${orcid}`;
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