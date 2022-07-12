import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Customer } from '../shared/customer';
import { ApiService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  customerForm: FormGroup;
  _id:string='';

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private api: ApiService, 
    private formBuilder: FormBuilder,
    private slimLoadingBarService: SlimLoadingBarService
    ) { }

  ngOnInit() {
    this.getCustomer(this.route.snapshot.params['id']);

    this.customerForm = this.formBuilder.group({
      'id': [null, Validators.required],
      'name': [null, Validators.required],
      'email' : [null, Validators.required],
      'phone' : [null, Validators.required],
      'address' : [null, Validators.required],
      'city' : [null, Validators.required],
      'country' : [null, Validators.required],
      'active' : [null, Validators.required]
    });
  }

  onFormSubmit(form:NgForm) {

    this.startLoading();
    form['active'] = +form['active'];
    
    var customer = new Customer();
    customer = {  
      id: form['id'],    
      name: form['name'],
      email: form['email'],
      phone: form['phone'],
      address: form['address'],
      city: form['city'],
      country: form['country'],
      active: form['active']
    };


    this.api.updateCustomer(customer).subscribe(res => {        
      this.completeLoading();
      this.router.navigate(['/customers']);
    }, (err) => {
      console.log(err);
      this.stopLoading();
    });

  }

  getCustomer(id: number) {
    this.api.getCustomer(id).subscribe(data => {
      
      this._id = data.id;

      this.customerForm.setValue({
        id: data.id,
        name: data.name,
        email: data.email ,
        phone: data.phone,
        address: data.address,
        city: data.city ,
        country: data.country,
        active: data.active        
      });
    });

  }

  delete() {
    this.startLoading();

    this.api.deleteCustomer(this._id)
      .subscribe(res => {
          this.completeLoading();
          this.router.navigate(['/customers']);
        }, (err) => {
          console.log(err);
          this.stopLoading();
        }
      );
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
