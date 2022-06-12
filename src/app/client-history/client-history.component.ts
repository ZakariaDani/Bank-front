import { Component, OnInit } from '@angular/core';
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
  displayedColumns: string[] = ['emitter', 'receiver', 'amount', 'date'];
  constructor(private clientService:ClientService,
              private toast:ToastrService,
              private router:Router) { }

  ngOnInit(): void {
    this.clientService.getAllTransactions().subscribe(
      (response: any)=>{
        this.transactions = response.reverse();
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
