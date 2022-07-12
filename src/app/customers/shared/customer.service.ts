import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpResponse, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from '../../products/shared/product';
import { JsonString } from '../../shared/JsonString';
import { Customer } from './customer';
import { CustomerRequest } from './customer-request';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:8080/api/customer";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCustomers (): Observable<Customer[]> {
    return this.http.get<Customer[]>(apiUrl)
      .pipe(
        tap(customers => console.log('Fetch customer')),
        catchError(this.handleError('getCustomer', []))
      );
  }
  
  getCustomer (id: number): Observable<Customer> {    
    let url = apiUrl + "/" + id;
    return this.http.get<Customer>(url).pipe(
      tap(_ => console.log('fetched product id=${id}')),
      catchError(this.handleError<Customer>('getProduct id=${id}'))
    );
  }
  

  updateCustomer (customer): Observable<any> {
    return this.http.post(apiUrl, customer, httpOptions).pipe(
      tap(_ => console.log('updated customer id=${id}')),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  addCustomer (customer: CustomerRequest): Observable<CustomerRequest> {
    return this.http.post<CustomerRequest>(apiUrl, customer)
      .pipe(
        tap((customer: CustomerRequest) => console.log('added customer w/ id=${customer.idProduct}')),
        catchError(this.handleError('addCustomer', customer))
      );
  }

  deleteCustomer (id): Observable<Customer> {
    let url = apiUrl + "/" + id;
    return this.http.delete<Customer>(url, httpOptions).pipe(
      tap(_ => console.log('deleted product id=${id}')),
      catchError(this.handleError<Customer>('deleteCustomer'))
    );
  }

}
