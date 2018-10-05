import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-calorie-calculator',
  templateUrl: './calorie-calculator.component.html',
  styleUrls: ['./calorie-calculator.component.css']
})
export class CalorieCalculatorComponent implements OnInit {
  @ViewChild('sub_btn') myDiv: ElementRef;
  @ViewChild('f') SubmitForm: NgForm;
  errorMessage: boolean = false;
  notFocused: boolean = true;
  activity_check: boolean = true;    //to check on component either activity one so show bmr only.
  Sub_and_get: boolean = false;
  selected: any;
  Unit_selected: number;
  show_us_fields: boolean = false;
  show_metric_fields: boolean = false;
  selected_opt: boolean = false;
  selectedValue: any = 1;
  BMR: number = 0;
  user_data = {
    age: 0,
    gender: "",
    hEight: 0,
    weight: 0,
    activity_factor: 0,
  }
  calculated_Data_result = {
    res1: 0,   //day to maintain your weight.
    res2: 0,  //day to lose 1 lb per week.
    res3: 0, //day to lose 2 lb per week.
    res4: 0, //day to lose 2 lb per week.
    res5: 0 //day to gain 2 lb per week.
  }  //if activity level > 1
  constructor() { }

  ngOnInit() {
    this.selected_opt = true;
    this.activity_check = true;
    this.select(1);
  }
  select(item) {
    this.selected = item;
    if (this.selected == 1)     //Checking US UNIT or Metric Units
    {
      this.Unit_selected = 1;
      this.show_us_fields = true;    //Us unit form fields.
      this.show_metric_fields = false;
    }
    else {
      this.Unit_selected = 2;
      this.show_us_fields = false;    //Us unit form fields.
      this.show_metric_fields = true;
    }
  };
  isActive(item) {
    return this.selected === item;
  };
  //Form Process functions
  OnSubmit() {
    if (!this.SubmitForm.valid) {
      this.notFocused = true;
      this.errorMessage = !this.errorMessage;
    }
    else {
      this.user_data.age = this.SubmitForm.value.age;
      this.user_data.gender = this.SubmitForm.value.gender;
      if (this.show_us_fields) {
        this.user_data.weight = this.SubmitForm.value.weight * 0.453592;
        this.user_data.hEight = (this.SubmitForm.value.height_feet * 30.48) + (this.SubmitForm.value.height_inch * 2.54);
      }
      else {
        this.user_data.weight = this.SubmitForm.value.weight;
        this.user_data.hEight = this.SubmitForm.value.height_cm;
      }
      this.user_data.activity_factor = this.SubmitForm.value.activity;
      this.calculation_calorie();
      this.SubmitForm.reset();
      this.select(1);

    }
  }
  calculation_calorie()    //Calculation of whole data
  {
    if (this.user_data.gender == '1') //Male
    {
      this.BMR = 10 * this.user_data.weight + 6.25 * this.user_data.hEight - 5 * this.user_data.age + 5;
    }
    if (this.user_data.gender == '2') //Female
    {
      this.BMR = 10 * this.user_data.weight + 6.25 * this.user_data.hEight - 5 * this.user_data.age - 161;
    }
    this.BMR = Math.round(this.BMR * this.user_data.activity_factor);
    this.Finalize_output();
  }

  Finalize_output() //finalize all data to output
  {
    if (this.user_data.activity_factor == 1) {
      this.Sub_and_get = true;
      this.activity_check = true;
    }
    else {

      this.Sub_and_get = true;
      this.activity_check = false;
      this.calculated_Data_result.res1 = this.BMR;
      this.calculated_Data_result.res2 = this.BMR - 500;
      this.calculated_Data_result.res3 = this.BMR - 1000;
      this.calculated_Data_result.res4 = this.BMR + 500;
      this.calculated_Data_result.res5 = this.BMR + 1000;
    }
  }
  clearForm() {   // Clear Form on Click Clear Form
    this.SubmitForm.reset();
  }

  Trigger_Btn() {   //Trigger Btn of form on Div click (Calculate)
    let el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
    el.click();
  }
}
