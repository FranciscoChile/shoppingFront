import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/product.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SlimLoadingBarService}  from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})

export class ProductAddComponent implements OnInit {

  productForm: FormGroup;

  files: any  = [];  

  constructor(
    private router: Router, 
    private api: ApiService, 
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private slimLoadingBarService: SlimLoadingBarService
    ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'sku' : [null, Validators.required],
      'nameProduct' : [null, Validators.required],
      'description' : [null, Validators.required],
      'priceList' : [null, Validators.required],
      'priceSell' : [null, Validators.required],
      'stock' : [null, Validators.required],
      'active' : [null]
    });

  }

  onFormSubmit(form:NgForm) {

    this.startLoading();
    var formData = new FormData();

    form['active'] = +form['active'];
    formData.append("product", JSON.stringify(form));

    this.files.forEach(file => {  
      formData.append("files",file);
    }); 

    this.api.updateProductMultipleImages(formData)
    .subscribe(res => {        
        this.completeLoading();
        this.files = [];
        formData = new FormData();
        this.router.navigate(['/products']);
      }, (err) => {
        console.log(err);
        this.stopLoading();
      });

  }

  cancelEdit() {
    this.startLoading();
    this.router.navigate(['/products']);
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


  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element)
    }  
  }

  deleteAttachment(index) {
    this.files.splice(index, 1)
  }



}
