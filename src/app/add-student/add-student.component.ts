// add-student.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../student.service';
import { Student } from '../student';

@Component({
  selector: 'add-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
  providers: [StudentService]
})
export class AddStudentComponent {
  student: Student = new Student();

  constructor(private studentService: StudentService) {}

  addStudent() {
    this.studentService.addStudent(this.student)
      .subscribe(data => {
        console.log(data);
        // Add any additional logic if necessary
      });
  }
}
