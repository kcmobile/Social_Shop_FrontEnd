import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpErrorResponse, HttpEventType, HttpEvent } from "@angular/common/http";
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class HttpcommonService {
  baseUrl = environment.apiUrl;
  bucketUrl = environment.bucketUrl;
  
  constructor(private _http: HttpClient, private toastr: ToastrService) { }

  postCall(routeUrl: string, data: any): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}${routeUrl}`, data);
  }

  getCall(routeUrl: string): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}${routeUrl}`);
  }

  putCall(routeUrl: string, data: any): Observable<any> {
    return this._http.put<any>(`${this.baseUrl}${routeUrl}`, data);
  }

  deleteCall(routeUrl: string, id: any): Observable<any> {
    return this._http.delete<any>(`${this.baseUrl}${routeUrl}/${id}`);
  }

  errorShow(error) {
    if (typeof error == 'string') {
      this.toastr.error(error);
    } else if (error.error.message != undefined) {
      this.toastr.error(error.error.message)
    } else {
      this.toastr.error(error.message)
    }
  }

  findByIdAndDelete(data, id) {
    var newArray = [];
    data.forEach(element => {
      if (element.id != id) {
        newArray.push(element);
      }
    });
    return newArray;
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  setOptions(field) {
    return {
      displayKey: field, //if objects array passed which key to be displayed defaults to description
      search: true, //true/false for the search functionlity defaults to false,
      height: '200px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder: 'Select', // text to be displayed when no item is selected defaults to Select,
      searchPlaceholder: 'Search', // label thats displayed in search input,
      searchOnKey: field, // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
      clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    }
  }

}
