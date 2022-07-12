import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from './shared/product.service';
import { Product } from './shared/product';
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['sku', 'nameProduct', 'description', 'priceList', 'priceSell', 'stock', 'active'];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private slimLoadingBarService: SlimLoadingBarService, private api: ApiService) { 
  
  }

  ngOnInit() {

    this.api.getProducts()
      .subscribe(res => {
        this.dataSource.data = res;
      }, err => {
        console.log(err);
      });

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
