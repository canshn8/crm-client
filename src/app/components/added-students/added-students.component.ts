import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../models/studentModel';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StudentService } from '../../service/student.service';
import { CommonModule } from '@angular/common';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StudentContactModel } from '../../models/contactStudentModel';
@Component({
  selector: 'app-added-students',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    FormatDatePipe,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './added-students.component.html',
  styleUrl: './added-students.component.css',
})
export class AddedStudentsComponent implements OnInit {
  meetingForm: FormGroup;
  updateForm: FormGroup;
  contactForm: FormGroup;
  startingForm: FormGroup;

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getStudents();
    this.createMeetingForm();
  }

  students: StudentModel[] = [];
  updatedStudent: StudentModel;

  createMeetingForm() {
    this.meetingForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      no: ['', Validators.required],
      dataSource: ['', Validators.required],
      interestedEducation: ['', Validators.required],
      isReg: ['', Validators.required],
      staff: ['', Validators.required],
      careerCounselor: ['', Validators.required],
      report: ['', Validators.required],
      tc: ['', Validators.required],
      location: ['', Validators.required],
      collectionAmount: ['', Validators.required],
      advancePay: ['', Validators.required],
      educationHistory: ['', Validators.required],
      collection: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      regHistory: ['', Validators.required],
      numberBills: ['', Validators.required],
    });
  }

  add() {
    if (this.meetingForm.valid) {
      let studentModel = Object.assign({}, this.meetingForm.value);
      this.studentService.studentAdd(studentModel).subscribe(
        (response) => {
          this.toastrService.info(response.message);
          window.location.reload();
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
  }

  getStudentByMail(email: string) {
    this.studentService.getStudentByMail(email).subscribe((response) => {
      console.log(response.data);
      this.updatedStudent = response.data;
    });
  }

  deleteStudent(id: string) {
    this.studentService.studentDelete(id).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        window.location.reload();
      },
      (responseError) => {
        this.toastrService.error(responseError.error);
      }
    );
  }

  getStudents() {
    this.studentService.getStudents().subscribe((response) => {
      this.students = response.data;
    });
  }
}
