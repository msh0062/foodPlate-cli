import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Goal } from '../models/Goals';
import { GoalsService } from '../services/goals.service';

@Component({
  selector: 'fp-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  goalForm: FormGroup;
  goal: Goal;
  allGoals; //: Array<Goal>;
  errorMessage: string;
  isLoading: boolean;


  createForm(): void {
    this.goalForm = this.fb.group({
      id: [''],
      goalTitle: ['', Validators.required],
      deadline: ['', Validators.required],
      didIt: ['']
    })
  }

  constructor(private fb: FormBuilder, private goalService: GoalsService) {
    this.createForm(); //actually creates the form
   }

  ngOnInit(): void {
    //this.createForm(); //actually creates the form
    this.goalService.getGoals()
      .subscribe((res: any) => {
        this.allGoals = res;
        console.log(this.allGoals);
        this.isLoading = false;
      },
      err => {
        this.errorMessage = err;
        console.log(this.errorMessage);
        this.isLoading = false;
      });
  }

}
