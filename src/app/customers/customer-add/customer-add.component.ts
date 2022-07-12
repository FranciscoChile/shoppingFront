
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/customer.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SlimLoadingBarService}  from 'ng2-slim-loading-bar';
import { Customer } from '../shared/customer';
import { CustomerRequest } from '../shared/customer-request';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  customerForm: FormGroup;

  constructor(
    private router: Router, 
    private api: ApiService, 
    private formBuilder: FormBuilder,
    private slimLoadingBarService: SlimLoadingBarService
    ) { }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, Validators.required],
      'phone' : [null, Validators.required],
      'address' : [null, Validators.required],
      'city' : [null, Validators.required],
      'country' : [null, Validators.required],
      'active' : [null]
    });
  }

  onFormSubmit(form:NgForm) {

    this.startLoading();    
    form['active'] = +form['active'];
    
    var customer = new CustomerRequest();
    customer = {      
      name: form['name'],
      email: form['email'],
      phone: form['phone'],
      address: form['address'],
      city: form['city'],
      country: form['country'],
      active: form['active']
    };


    this.api.addCustomer(customer).subscribe(res => {        
      this.completeLoading();
      this.router.navigate(['/customers']);
    }, (err) => {
      console.log(err);
      this.stopLoading();
    });

  }

  cancelEdit() {
    this.startLoading();
    this.router.navigate(['/customers']);
    this.completeLoading();
  }

  startLoading() {
    this.slimLoadingBarService.start(() => {
        console.log('Loading complete');
    });
  }

  stopLoading() {
      this.slimLoadingBarService.stop();
  }

  completeLoading() {
      this.slimLoadingBarService.complete();
  }

}
