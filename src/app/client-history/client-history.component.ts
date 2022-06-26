import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-history',
  templateUrl: './client-history.component.html',
  styleUrls: ['./client-history.component.css']
})
export class ClientHistoryComponent implements OnInit {

  public transactions = [];
  length = 0;
  item_per_page = 5;
  pageSizeOptions: number[] = [5, 10];
  displayedColumns: string[] = ['emitter', 'receiver', 'amount', 'date'];

  constructor(private clientService:ClientService,
              private toast:ToastrService,
              private router:Router) { }

  ngOnInit(): void {
    this.fetchTransactions(5 , 1);

  }

  changePage(event:any){
    console.log("test");
    this.fetchTransactions(event.pageSize, event.pageIndex+1);
  }

  fetchTransactions(item_per_page:number,pageIndex:number){

    this.clientService.getAllTransactions(item_per_page,pageIndex).subscribe(
      (response:any)=>{
        this.length = response.totalElements;
        this.transactions = response;
      },
      (error)=>{
        this.toast.error(
          "There is something wrong with the server try later",
          "",
          {timeOut:2000}

        ).onHidden.subscribe(
          ()=>{
            this.router.navigate(["client-home"])
          }
        )
      }
    )
  }

}
