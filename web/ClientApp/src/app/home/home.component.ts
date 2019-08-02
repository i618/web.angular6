import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public Students: Student[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.LoadStudents();
  }

  public LoadStudents(): void {
    this.http.get<Student[]>(this.baseUrl + 'api/Students/').pipe(
      catchError((err) => this.errorService.handleError(err))
    ).subscribe(result => {
      this.Students = result;
    }, error => console.error(error));
  }

  public TotalStudents(): number {
    return this.Students.length;
  }

  public DeleteStudent(id: number): void {
    console.info(id)

    this.http.delete<Student[]>(this.baseUrl + 'api/Students/' + id).pipe(
      catchError((err) => this.errorService.handleError(err))
    ).subscribe(
      result => { },
      error => console.error(error),
      () => this.LoadStudents());
  }

  public FindByLastName(lastName: string): void {
    if (lastName) {
      this.http.get<Student[]>(this.baseUrl + 'api/Students/findByLastName/' + lastName).pipe(
        catchError((err) => this.errorService.handleError(err))
      ).subscribe(result => {
        this.Students = result;
      }, error => console.error(error));
    } else {
      this.LoadStudents();
    }
  }
}

interface Student {
  id: number;
  genderName: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  guid: string;
}
