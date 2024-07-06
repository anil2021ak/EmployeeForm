import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  rForm!: FormGroup;
  designation = ["Manager", "Software Developer", "Software Tester"];
  gender = ["Male", "Female", "Others"];
  employeesFormArray!: FormArray;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.rForm = this.fb.group({
      employeeId: [null],
      employeeName: [null, Validators.required],
      designation: [null],
      salary: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: [null, [Validators.required, Validators.email]],
      mobile: [null, [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      gender: [null, Validators.required]
    });
    this.employeesFormArray = this.fb.array([]);
    this.loadEmployeesFromLocalStorage();
  }

  onradiobtnChange(event: any) {
    this.rForm.get('gender')?.setValue(event.target.value);
  }

  onSubmit(formData: any) {
    if (this.rForm.valid) {
      this.employeesFormArray.push(this.fb.group(this.rForm.value));
      this.rForm.reset();
      this.rForm.get('gender')?.setValue(null);
    }
    console.log(formData);
  }

  deleteEmployee(index: number) {
    confirm("Are You Sure You want to delete")
    this.employeesFormArray.removeAt(index);
  }

  save() {
      localStorage.setItem('employees', JSON.stringify(this.employeesFormArray.value));
  }

  loadEmployeesFromLocalStorage() {
    let data = localStorage.getItem('employees');
    if (data) {
      JSON.parse(data).forEach((employee: any) => {
        this.employeesFormArray.push(this.fb.group(employee));
      });
    }
  }
}

