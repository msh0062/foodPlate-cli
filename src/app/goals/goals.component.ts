import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  activeGoal: Goal;
  newGoalView = false;

  showEditGoalForm(goal: Goal): void {
    this.newGoalView = true;
    this.getGoal(goal.id);
    this.showGoalAddEditForm(true);
  }

  showAddGoalForm(): void {
    this.showGoalAddEditForm(true);
    this.resetGoalForm();
  }

  showGoalAddEditForm(showForm: boolean): void {
    this.newGoalView = showForm;
  }

  toggleGoalComplete(goal: Goal): void {
    goal.didIt = !goal.didIt;
  }

  resetGoalForm(): void {
    this.goalForm.reset();
  }

  createForm(): void {
    this.goalForm = this.fb.group({
      id: [''],
      goalTitle: ['', Validators.required],
      deadline: ['', Validators.required],
      didIt: ['']
    })
  }

  getGoal(id): void {
    this.goalService.getGoalById(id)
      .subscribe(goal => this.goalRetrieved(goal),
      error => console.log(error));
  }

  goalRetrieved(goal): void { //sets value for the form 
    this.goal = goal;
    this.goalForm.setValue({
      id: this.goal.id,
      deadline: this.goal.deadline,
      didIt: this.goal.didIt,
      goalTitle: this.goal.goalTitle

    })
  }

  deleteGoal(goal): void {
    this.goalService.deleteGoalById(goal.id)
      .subscribe(goal => {this.goalService.getGoals();
     console.log(goal)}
      );
  }

  deleteCompleted(): void {
    const completedGoals = this.allGoals.filter(goals => goals.didIt === true)
          .map(goals => this.deleteGoal(goals));
      console.log(completedGoals);
  }

  insertGoal(goal: Goal): void {
    this.goalService.addGoal(goal)
      .subscribe(goal => {
        this.goalService.getGoals();
      },
      (error) => console.log(error))
  }

  updateGoal(goal: Goal): void {
    this.goalService.updateGoal(goal)
      .subscribe(goal => this.goalService.getGoals());
  }

  toggleAccomplished(): void {
    console.log(`toggleAccomplished called`);
    this.goalForm.patchValue({didIt: true});
  }

  submitGoal(goal): void {
    console.log(`submitGoal() called`);
    if(this.goalForm.invalid) {
      console.log(`submitGoal(): this goalForm.invalid = true`);
      return;
    }
    this.showGoalAddEditForm(false);
    //insert
    if (goal.id === null || goal.id < 1) {
      this.insertGoal(goal);
    }
    //update
    else {
      this.updateGoal(goal);
    }
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
