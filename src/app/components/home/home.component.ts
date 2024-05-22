import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { StudentService } from '../../service/student.service';
import { StudentModel } from '../../models/studentModel';
import { ToastrService } from 'ngx-toastr';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { StudentContactModel } from '../../models/contactStudentModel';
import {
  CalendarView,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarModule,
} from 'angular-calendar';
import {
  subDays,
  startOfDay,
  addDays,
  endOfMonth,
  addHours,
  isSameMonth,
  isSameDay,
  endOfDay,
} from 'date-fns';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { StudentStartRegModel } from '../../models/startStudentRegModel';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StudentDetailModel } from '../../models/StudentDetailModel';
import { StudentComponent } from '../student/student.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  purple: {
    primary: 'purple',
    secondary: 'purple',
  },
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormatDatePipe,
    CalendarModule,
    FormsModule,
    StudentComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  option: any;
  details: StudentDetailModel[] = [];
  studentsContact: StudentContactModel[] = [];
  students: StudentModel[] = [];
  studentsReg: StudentStartRegModel[] = [];
  alanlar: any[] = [];
  studentDetail: StudentDetailModel;

  noColor = '#dc3545';
  yesColor = '#00be09';
  laterColor = '#fff93d';
  elseColor = '#e100ff';

  constructor(
    private studentService: StudentService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getStudents();
    this.getStudentsReg();
  }

  reminder(student: StudentModel) {
    const currentDate = new Date();
    const currentDate2 = new Date(student.paymentHistory);
    const farkMilisaniye = currentDate2.getTime() - currentDate.getTime();
    const farkGun = Math.abs(farkMilisaniye / (1000 * 3600 * 24)); // Farkı günlere çevirme
    if (farkGun <= 1) return true;
    return false;
  }

  getStudents() {
    this.studentService.getStudents().subscribe((response) => {
      this.students = response.data;
      this.alanlar = this.students
        .filter((student) => student.collection > 0)
        .map((student) => student.collection);
      this.createPieChart();
      this.asd();
    });
  }

  getStudentsReg() {
    this.studentService.getStartingStudents().subscribe((response) => {
      this.studentsReg = response.data;
      console.log(this.studentsReg);
    });
  }

  createPieChart() {
    var chartDom = document.getElementById('pie')!;
    var myChart = echarts.init(chartDom);

    this.option = {
      title: {
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: this.students.length, name: ' Öğrenci Sayısı' },
            {
              value: this.alanlar.length,
              name: 'Kursu Satın Alan Öğrenci Sayısı',
            },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    this.option && myChart.setOption(this.option);
  }
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });
  }

  asd() {
    this.students.forEach((element) => {
      const originalDate = new Date(element.paymentHistory);
      this.events = [
        ...this.events,
        {
          title: element.firstName + element.lastName + element.report,
          start: originalDate,
          //end: endOfDay(new Date()),
          color: colors.purple,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
    });
  }
  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter((event) => event !== eventToDelete);
  // }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
