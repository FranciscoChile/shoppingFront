import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/product.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SlimLoadingBarService}  from 'ng2-slim-loading-bar';
import { JsonString } from '../../shared/JsonString';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  productForm: FormGroup;
  _id:string='';
  pi: any = [];
  imageBlobUrl:any = '';
  private readonly imageType : string = 'data:image/PNG;base64,';
  
  
  files: any  = [];  
  filesToDisplay: any  = [];  

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private api: ApiService, 
    private formBuilder: FormBuilder,
    private slimLoadingBarService: SlimLoadingBarService
    ) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);

    this.productForm = this.formBuilder.group({
      'id': [null, Validators.required],
      'sku': [null, Validators.required],
      'nameProduct' : [null, Validators.required],
      'description' : [null, Validators.required],
      'priceList' : [null, Validators.required],
      'priceSell' : [null, Validators.required],
      'stock' : [null, Validators.required],
      'active' : [null, Validators.required]
    });
    
  }

  getProduct(id) {
    this.api.getProduct(id).subscribe(data => {
      
      this._id = data.id;
      let pi: any[] =  data.productImages;

      if (pi)
      for (let index = 0; index < pi.length; index++) {
        var f = pi[index];

        this.api.getImage(f.skuProduct, f.imageProductName).subscribe(
          (data :JsonString ) => {
            this.filesToDisplay.push(this.imageType + data.content);
            //this.imageBlobUrl = (this.imageType + data.content);
          });
      }  

      
      // this.api.getImage1(f.skuProduct, f.imageProductName).subscribe(
      //   data2 => {
      //     console.log(data2);  
      //     this.createImageFromBlob(data2);
      //   });

      this.productForm.setValue({
        id: data.id,
        sku: data.sku,
        nameProduct: data.nameProduct,
        description: data.description,
        priceList: data.priceList,
        priceSell: data.priceSell,
        stock: data.stock,
        active: data.active
      });
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
        this.filesToDisplay = [];
        this.getProduct(form['id']);
        this.completeLoading();
        this.files = [];
        formData = new FormData();
      }, (err) => {
        console.log(err);
        this.stopLoading();
      });

  }

  productDetails() {
    this.router.navigate(['/product-details', this._id]);
  }

  delete() {
    this.startLoading();

    this.api.deleteProduct(this._id)
      .subscribe(res => {
          this.completeLoading();
          this.router.navigate(['/products']);
        }, (err) => {
          console.log(err);
          this.stopLoading();
        }
      );
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

  createImageFromBlob(image: Blob) {    
    let reader = new FileReader();
    reader.addEventListener("load", () => {
     this.imageBlobUrl = reader.result;
    }, false);
   
    if (image) {
     reader.readAsDataURL(image);
    }
   }


   public deleteQuestion(file) {
    alert("");
    console.log(file);
  }
}
