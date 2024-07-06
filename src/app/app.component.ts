import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from './student.service';
import { Student } from './student';
import { AddStudentComponent } from './add-student/add-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AddStudentComponent,
    UpdateStudentComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StudentService]
})
export class AppComponent implements OnInit {
  title = 'HTTP Client Example';
  students: Student[] = [];
  student: Student = new Student();

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.refreshStudentList();
  }

  refreshStudentList() {
    this.studentService.getStudents()
      .subscribe(data => {
        console.log(data);
        this.students = data;
      });
  }

  deleteStudent(id: number) {
    if (id > 0) {
      this.studentService.deleteStudent(id)
        .subscribe(() => {
          console.log('Student deleted');
          this.refreshStudentList();
        }, error => {
          console.error('Error deleting student:', error);
        });
    } else {
      console.error('Invalid ID');
    }
  }
}
