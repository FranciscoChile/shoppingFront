import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Customer } from '../shared/customer';
import { ApiService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'address', 'city', 'country', 'email', 'phone', 'active'];
  dataSource = new MatTableDataSource<Customer>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private slimLoadingBarService: SlimLoadingBarService, private api: ApiService) { 
  
  }

  ngOnInit() {

    this.api.getCustomers()
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


