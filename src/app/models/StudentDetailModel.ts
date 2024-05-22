export interface StudentDetailModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  paymentMethod?: string;
  paymentHistory?: Date;
  dataSource: string;
  no: string;
  isReg: string;
  interestedEducation: string;
  collection?: number;
  staff: string;
  careerCounselor: string;
  report: string;
}
