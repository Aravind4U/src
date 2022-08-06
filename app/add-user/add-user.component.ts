import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  public addForm: FormGroup;
  public id: number;
  public isUser: boolean = localStorage.user != '\"admin\"';
  public submitted = false;

  ngOnInit() {
    let isEdit = false;
    console.log(localStorage.user);
    this.route.queryParams.subscribe((params) => {
      isEdit = !!params.id;
      this.id = +params.id;
    });
    if (!isEdit) {
      this.addForm = this.formBuilder.group({
        userName: ['', [Validators.required, Validators.minLength(3)]],
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        age: ['', [Validators.required, Validators.max(100)]],
        salary: ['', Validators.required],
      });
    } else {
      const userData = JSON.parse(localStorage.userList);
      const filteredData = userData.filter((user) => user.id === this.id);
      this.addForm = this.formBuilder.group({
        userName: [
          filteredData[0].userName,
          [Validators.required, Validators.minLength(3)],
        ],
        firstName: [
          filteredData[0].firstName,
          [Validators.required, Validators.minLength(3)],
        ],
        lastName: [
          filteredData[0].lastName,
          [Validators.required, Validators.minLength(3)],
        ],
        age: [filteredData[0].age, [Validators.required, Validators.max(100)]],
        salary: [filteredData[0].salary, Validators.required],
      });
      if (this.isUser) {
        this.addForm.get('userName').disable();
      }
    }
  }

  get f() {
    return this.addForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.valid && !this.id) {
      const data = localStorage.userList
        ? JSON.parse(localStorage.userList)
        : [];
      this.addForm.value.id = data.length + 1;
      data.push(this.addForm.value);
      localStorage.userList = JSON.stringify(data);
      this.router.navigate(['/home']);
    } else if (this.addForm.valid && this.id) {
      const userData = JSON.parse(localStorage.userList);
      const filteredData = userData.filter((user) => user.id !== this.id);
      this.addForm.value.id = this.id;
      this.addForm.value.userName = this.addForm.controls.userName.value;
      filteredData.push(this.addForm.value);
      localStorage.userList = JSON.stringify(filteredData);
      this.router.navigate(['/home']);
    }
  }

  onCancel() {
    this.router.navigate(['/home']);
  }
}
