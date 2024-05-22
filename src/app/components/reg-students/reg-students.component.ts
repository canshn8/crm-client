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
import { StudentStartRegModel } from '../../models/startStudentRegModel';
@Component({
  selector: 'app-reg-students',
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
  templateUrl: './reg-students.component.html',
  styleUrl: './reg-students.component.css',
})
export class RegStudentsComponent implements OnInit {
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
    this.getStartingStudents();
    this.createStartingForm();
  }

  students: StudentModel[] = [];
  studentsContact: StudentContactModel[] = [];
  studentsStarting: StudentStartRegModel[] = [];
  updatedStudent: StudentModel;

  createStartingForm() {
    this.startingForm = this.formBuilder.group({
      nameSt: ['', Validators.required],
      emailSt: ['', Validators.required],
      tcSt: ['', Validators.required],
      noSt: ['', Validators.required],
      locationSt: ['', Validators.required],
      collectionAmountSt: ['', Validators.required],
      advancePaySt: ['', Validators.required],
      educationHistorySt: ['', Validators.required],
      regHistorySt: ['', Validators.required],
      dataSourceSt: ['', Validators.required],
      staffSt: ['', Validators.required],
      careerCounselorSt: ['', Validators.required],
      interestedEducationSt: ['', Validators.required],
      numberBillsSt: ['', Validators.required],
    });
  }

  addStartingReg() {
    let studentStartingModel = Object.assign({}, this.startingForm.value);
    const formatModal: StudentStartRegModel = {
      name: studentStartingModel.nameSt,
      email: studentStartingModel.emailSt,
      tc: studentStartingModel.tcSt,
      no: studentStartingModel.noSt,
      location: studentStartingModel.locationSt,
      collectionAmount: studentStartingModel.collectionAmountSt,
      advancePay: studentStartingModel.advancePaySt,
      educationHistory: studentStartingModel.educationHistorySt,
      regHistory: studentStartingModel.regHistorySt,
      staff: studentStartingModel.staffSt,
      dataSource: studentStartingModel.dataSourceSt,
      careerCounselor: studentStartingModel.careerCounselorSt,
      interestedEducation: studentStartingModel.interestedEducationSt,
      numberBills: studentStartingModel.numberBillsSt,
    };
    this.studentService.studentAddForStarting(formatModal).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        window.location.reload();
      },
      (responseError) => {
        this.toastrService.error(responseError.error);
      }
    );
  }

  getStudentByMail(email: string) {
    this.studentService.getStudentByMail(email).subscribe((response) => {
      console.log(response.data);
      this.updatedStudent = response.data;
    });
  }

  getStartingStudents() {
    this.studentService.getStartingStudents().subscribe((response) => {
      this.studentsStarting = response.data;
    });
  }
}
