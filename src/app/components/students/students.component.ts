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
import { RegStudentsComponent } from '../reg-students/reg-students.component';
import { ContactStudentsComponent } from '../contact-students/contact-students.component';
import { AddedStudentsComponent } from '../added-students/added-students.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    FormatDatePipe,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    RegStudentsComponent,
    ContactStudentsComponent,
    AddedStudentsComponent,
  ],
})
export class StudentsComponent implements OnInit {
  meetingForm: FormGroup;
  updateForm: FormGroup;

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createUpdateForm();
  }

  students: StudentModel[] = [];
  updatedStudent: StudentModel;

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      idUpd: ['', Validators.required],
      emailUpd: ['', Validators.required],
      firstNameUpd: ['', Validators.required],
      lastNameUpd: ['', Validators.required],
      paymentMethodUpd: ['', Validators.required],
      paymentHistoryUpd: ['', Validators.required],
      dataSourceUpd: ['', Validators.required],
      interestedEducationUpd: ['', Validators.required],
      noUpd: ['', Validators.required],
      isRegUpd: ['', Validators.required],
      collectionUpd: ['', Validators.required],
      staffUpd: ['', Validators.required],
      careerCounselorUpd: ['', Validators.required],
      reportUpd: ['', Validators.required],
    });
  }

  updateStudent() {
    let studentModel = Object.assign({}, this.updateForm.value);
    const formatModal: StudentModel = {
      id: studentModel.idUpd,
      email: studentModel.emailUpd,
      firstName: studentModel.firstNameUpd,
      lastName: studentModel.lastNameUpd,
      paymentMethod: studentModel.paymentMethodUpd,
      paymentHistory: studentModel.paymentHistoryUpd,
      interestedEducation: studentModel.interestedEducationUpd,
      dataSource: studentModel.dataSourceUpd,
      isReg: studentModel.isRegUpd,
      no: studentModel.noUpd,
      staff: studentModel.staffUpd,
      careerCounselor: studentModel.careerCounselorUpd,
      collection: studentModel.CollectionUpd,
      report: studentModel.reportUpd,
      tc: studentModel.tcUpd,
      location: studentModel.locationUpd,
      collectionAmount: studentModel.collectionAmountUpd,
      advancePay: studentModel.advancePayUpd,
      educationHistory: studentModel.educationHistoryUpd,
      regHistory: studentModel.regHistoryUpd,
      numberBills: studentModel.numberBillsUpd,
    };
    this.studentService.studentUpdate(formatModal).subscribe(
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
