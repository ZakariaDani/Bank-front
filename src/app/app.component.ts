import { Component, OnInit } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AgentServicesService } from './agentService/agent-services.service';
import { DialogComponent } from './dialog/dialog.component';
import {AfterViewInit,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Bank-front';
  displayedColumns: string[] = ['name', 'email', 'phone','idCardNumber','birth','Actions'];
  dataSource!: MatTableDataSource <any> ;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  
  constructor(private dialog:MatDialog,private api:AgentServicesService){}
  ngOnInit(): void {
      this.getAllAgent();
  }
  addAgent() {
    this.dialog.open(DialogComponent, {
      width:'30%',
      minWidth:'300px'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllAgent();
      }
    })
  }
  getAllAgent(){
    this.api.getAgents().subscribe({
      next:(res:any)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while getting data")
        console.log(err)
      }
    })
  }
  editAgent(element:any){
    this.dialog.open( DialogComponent,{
      width:'30%',
      minWidth:'300px',
      data:element

    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllAgent();
      }
    })
  }
  deleteAgent(element:any){
    this.api.deleteAgent(element.idCardNumber).subscribe({
      next:(res)=>{
        alert('Agent successfully deleted')
        this.getAllAgent();
      },
      error:()=>{
        alert('Error While deleting this Agent')
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
export interface PeriodicElement {
  id: number;
  name: string;
  phone: number;
  email: string;
  birth:string;
  idCardNumber:string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', phone: 1.0079,idCardNumber:'EE8327', email: 'H',birth:'3002'},
  {id: 2, name: 'Helium', phone: 4.0026,idCardNumber:'EE8327', email: 'He',birth:'3002'},
  {id: 3, name: 'Lithium', phone: 6.941,idCardNumber:'EE8327', email: 'Li',birth:'3002'},
  {id: 4, name: 'Beryllium', phone: 9.0122,idCardNumber:'EE8327', email: 'Be',birth:'3002'},
  {id: 5, name: 'Boron', phone: 10.811,idCardNumber:'EE8327', email: 'B',birth:'3002'},
  {id: 6, name: 'Carbon', phone: 12.0107,idCardNumber:'EE8327', email: 'C',birth:'3002'},
  {id: 7, name: 'marouanezibout@gmail.com',idCardNumber:'EE8327', phone: 14.0067, email: 'N',birth:'3002'},
  {id: 8, name: 'Oxygen', phone: 15.9994,idCardNumber:'EE8327', email: 'O',birth:'3002'},
  {id: 9, name: 'Fluorine', phone: 18.9984,idCardNumber:'EE8327', email: 'F',birth:'3002'},
  {id: 10, name: 'Neon', phone: 20.1797,idCardNumber:'EE8327', email: 'Ne',birth:'3002'},
  {id: 11, name: 'Sodium', phone: 22.9897,idCardNumber:'EE8327', email: 'Na',birth:'3002'},
  {id: 12, name: 'Magnesium', phone: 24.305,idCardNumber:'EE8327', email: 'Mg',birth:'3002'},
  {id: 13, name: 'Aluminum', phone: 26.9815,idCardNumber:'EE8327', email: 'Al',birth:'3002'},
  {id: 14, name: 'Silicon', phone: 28.0855,idCardNumber:'EE8327', email: 'Si',birth:'3002'},
  {id: 15, name: 'Phosphorus', phone: 30.9738,idCardNumber:'EE8327', email: 'P',birth:'3002'},
  {id: 16, name: 'Sulfur', phone: 32.065,idCardNumber:'EE8327', email: 'S',birth:'3002'},
  {id: 17, name: 'Chlorine', phone: 35.453,idCardNumber:'EE8327', email: 'Cl',birth:'3002'},
  {id: 18, name: 'Argon', phone: 39.948,idCardNumber:'EE8327', email: 'Ar',birth:'3002'},
  {id: 19, name: 'Potassium', phone: 39.0983,idCardNumber:'EE8327', email: 'K',birth:'3002'},
  {id: 20, name: 'Calcium', phone: 40.078,idCardNumber:'EE8327', email: 'Ca',birth:'3002'},
];
