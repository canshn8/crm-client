import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentModel } from '../models/studentModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listRespondeModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { StudentContactModel } from '../models/contactStudentModel';
import { StudentStartRegModel } from '../models/startStudentRegModel';
import { StudentDetailModel } from '../models/StudentDetailModel';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  apiURL = 'https://localhost:44380/api/Students';

  constructor(private httpClient: HttpClient) {}

  studentAdd(studentAdd: StudentModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiURL + '/Add',
      studentAdd
    );
  }

  getStudents(): Observable<ListResponseModel<StudentModel>> {
    return this.httpClient.get<ListResponseModel<StudentModel>>(
      this.apiURL + '/Getall'
    );
  }

  studentDelete(studentId: string): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(
      this.apiURL + '/Delete?id=' + studentId
    );
  }

  getStudentByMail(
    email: string
  ): Observable<SingleResponseModel<StudentModel>> {
    return this.httpClient.get<SingleResponseModel<StudentModel>>(
      this.apiURL + '/GetByMail?email=' + email
    );
  }

  getStudentDetails(
    id: string
  ): Observable<SingleResponseModel<StudentDetailModel>> {
    return this.httpClient.get<SingleResponseModel<StudentDetailModel>>(
      this.apiURL + '/GetDetails?id=' + id
    );
  }

  studentUpdate(student: StudentModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiURL + '/Update',
      student
    );
  }

  studentAddForContact(
    studentContact: StudentContactModel
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiURL + '/AddContact',
      studentContact
    );
  }

  getContactStudents(): Observable<ListResponseModel<StudentContactModel>> {
    return this.httpClient.get<ListResponseModel<StudentContactModel>>(
      this.apiURL + '/GetAllContact'
    );
  }

  studentAddForStarting(
    studentStarting: StudentStartRegModel
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiURL + '/AddStarting',
      studentStarting
    );
  }

  getStartingStudents(): Observable<ListResponseModel<StudentStartRegModel>> {
    return this.httpClient.get<ListResponseModel<StudentStartRegModel>>(
      this.apiURL + '/GetAllStarting'
    );
  }
}
