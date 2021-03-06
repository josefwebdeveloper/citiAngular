import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ApiService, countriesQuery, gql} from "../../services/api.service";
import {filter, map, Observable, Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Country} from "../../models/countries";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy,AfterViewInit {
  public gqlquery$:Observable<any>;
  displayedColumns: string[] = ['name', 'capital', 'continent', 'currency'];
  dataSource: MatTableDataSource<Country[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private  apiService:ApiService) {


    this.gqlquery$ = this.apiService.query(countriesQuery);
  }

  subscription: Subscription;
  ngOnInit(): void {
    this.subscription = this.gqlquery$.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data.countries);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngAfterViewInit() {

  }
  ngOnDestroy() {
  if(this.subscription){
    this.subscription.unsubscribe()
  }
  }

}
