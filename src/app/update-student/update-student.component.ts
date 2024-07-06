// update-student.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../student.service';
import { Student } from '../student';

@Component({
  selector: 'update-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css'],
  providers: [StudentService]
})
export class UpdateStudentComponent implements OnInit {
  title = 'HTTP Client Example';
  students: Student[] = [];
  student: Student = new Student();
  selectedStudentId: number | null = null;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.refreshStudentList();
  }

  refreshStudentList() {
    this.studentService.getStudents()
      .subscribe(data => {
        console.log('Fetched Students:', data); // Log data to verify IDs
        this.students = data;
      });
  }

  updateStudent() {
    if (this.selectedStudentId && this.selectedStudentId > 0) {
      this.studentService.updateStudent(this.selectedStudentId, this.student)
        .subscribe(data => {
          console.log('Updated Student:', data);
          this.refreshStudentList();
        });
    } else {
      console.error("Invalid ID");
    }
  }

  onIdChanged(value: number) {
    console.log('onIdChanged');
    console.log(value);
    this.selectedStudentId = value;
    if (value > 0) {
      this.studentService.getStudentById(value)
        .subscribe(data => {
          console.log('Fetched Student:', data);
          this.student = data;
        });
    }
  }
}
