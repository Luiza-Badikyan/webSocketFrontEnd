import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    private url = environment.URL;

    constructor(private http: HttpClient) { }

    getHeaders(body) {
      const headerObject = {};
      if (body && !(body instanceof FormData)) {
        headerObject['Content-Type'] = 'application/json';
      } else if (body && body.files) {
          headerObject['Content-Type'] = 'multipart/form-data';
      }

      return new HttpHeaders(headerObject);
    }

    public request(type: string, url: string, body: object | null = null, requestOption?: object): Observable<any> {
        const URL = this.url + url;
        const argArray: Array<any> = [URL];

        let options = {
            observe: 'response',
            headers: this.getHeaders(body)
        };

        if ((type === 'get' || type === 'delete') && requestOption) {
            options = {...options, ...requestOption};
            argArray.push(options)
        } else {
            // let data = null;
            // if (body) {
            //   data = body instanceof FormData ? body : JSON.stringify(body)
            // }
            argArray.push(body);
            if (requestOption) {
                argArray.push(options)

            }
        }

        // return this.http[type](...argArray)
        return this.http[type](...argArray)
    }
}
