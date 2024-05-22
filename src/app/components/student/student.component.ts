import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from '../../service/student.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StudentModel } from '../../models/studentModel';
import { StudentContactModel } from '../../models/contactStudentModel';
import { StudentStartRegModel } from '../../models/startStudentRegModel';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { StudentDetailModel } from '../../models/StudentDetailModel';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent implements OnInit {
  @Input() studentsDetailModel!: StudentDetailModel;
  updateForm: FormGroup;
  studentDetail: StudentDetailModel;
  students: StudentModel[] = [];

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.getStudentDetail(id);
  }

  getStudentDetail(id: string) {
    this.studentService.getStudentDetails(id).subscribe(
      (response) => {
        this.studentDetail = response.data;
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message);
      }
    );
  }
}
