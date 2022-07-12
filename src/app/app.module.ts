import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule, MatSidenavModule, MatProgressBarModule,
  MatToolbarModule, MatListModule, MatSlideToggleModule, MatGridListModule } from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from "@angular/router";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { DragDropDirective } from './shared/drag-drop.directive';
import { CustomerAddComponent } from './customers/customer-add/customer-add.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { CustomerEditComponent } from './customers/customer-edit/customer-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductAddComponent,
    ProductEditComponent,
    SideNavComponent,
    DragDropDirective,
    CustomerAddComponent,
    CustomerListComponent,
    ProductListComponent,
    CustomerEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule, SlimLoadingBarModule.forRoot(), MatProgressBarModule,
    MatSidenavModule, MatToolbarModule, LayoutModule, MatListModule,
    MatExpansionModule, MatTabsModule, MatSlideToggleModule, MatGridListModule,
    RouterModule.forRoot([
      {path: '', component: ProductAddComponent}
    ]/*, {useHash: false}*/),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [MatSortModule]
})
export class AppModule { }
