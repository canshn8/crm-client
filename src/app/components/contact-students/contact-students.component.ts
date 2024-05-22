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
  selector: 'app-contact-students',
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
  templateUrl: './contact-students.component.html',
  styleUrl: './contact-students.component.css',
})
export class ContactStudentsComponent implements OnInit {
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
    this.getContactStudents();
    this.createContactForm();
  }

  students: StudentModel[] = [];
  studentsContact: StudentContactModel[] = [];
  studentsStarting: StudentStartRegModel[] = [];
  updatedStudent: StudentModel;

  createContactForm() {
    this.contactForm = this.formBuilder.group({
      nameCt: ['', Validators.required],
      noCt: ['', Validators.required],
      staffCt: ['', Validators.required],
      dataSourceCt: ['', Validators.required],
      interestedEducationCt: ['', Validators.required],
      careerCounselorCt: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  addForContact() {
    let studentContactModel = Object.assign({}, this.contactForm.value);
    const formatModal: StudentContactModel = {
      no: studentContactModel.noCt,
      name: studentContactModel.nameCt,
      staff: studentContactModel.staffCt,
      dataSource: studentContactModel.dataSourceCt,
      interestedEducation: studentContactModel.interestedEducationCt,
      careerCounselor: studentContactModel.careerCounselorCt,
      comment: studentContactModel.comment,
    };
    this.studentService.studentAddForContact(formatModal).subscribe(
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

  getContactStudents() {
    this.studentService.getContactStudents().subscribe((response) => {
      this.studentsContact = response.data;
    });
  }
}
