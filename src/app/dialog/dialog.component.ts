import { Component, Inject, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormsModule ,FormBuilder,Validator, Validators} from '@angular/forms';
import {AgentServicesService} from '../agentService/agent-services.service';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  edit:boolean=true
  btnName:string = "SAVE"
  agentForm !:FormGroup;
  constructor(private formBuilder : FormBuilder,
    private api:AgentServicesService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.agentForm = this.formBuilder.group({
      name : ['',Validators.required],
      email : ['',[Validators.email,Validators.required]],
      phone : ['',[Validators.required,Validators.pattern(new RegExp("[0-9]{10}"))]],
      idCardNumber : ['',[Validators.required,Validators.minLength(4)]],
      birth : ['',Validators.required]
    })
    if(this.editData){
      this.edit=false
      this.btnName="UPDATE"
      this.agentForm.controls['name'].setValue(this.editData.name)
      this.agentForm.controls['email'].setValue(this.editData.email)
      this.agentForm.controls['phone'].setValue(this.editData.phone)
      this.agentForm.controls['idCardNumber'].setValue(this.editData.idCardNumber)
      this.agentForm.controls['birth'].setValue(this.editData.birth)
      console.log(this.editData)
    }
  }
  addAgent(){
    if(!this.editData){
      if(this.agentForm.valid){
        this.api.postAgent(this.agentForm.value).subscribe({
          next:(res)=>{
            alert("Agent Account added successfully")
            this.agentForm.reset();
            this.dialogRef.close('save');
          },
          error:(res)=>{
            alert("Error while adding the Agent")
            console.log(res.error.message)
          }
        })
      }else{
        alert("the form is not valid!")
      }
    }else{
      if(this.agentForm.valid){
        this.updateAgent();
      }else{
        alert("the form is not valid!")
      }
    }
  }
  updateAgent(){
    this.api.putAgent(this.agentForm.value,this.editData.idCardNumber).subscribe({
      next:(res)=>{
        alert("Agent updated succesfully")
        this.agentForm.reset();
        this.dialogRef.close('update');
      },
      error:(err)=>{
        alert("error while updating this record!")
        console.log(err.error.message);
      }
        
    })
  }
}
