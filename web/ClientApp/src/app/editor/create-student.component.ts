import { Component, Inject, Directive } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../error.service';
import { catchError } from 'rxjs/operators';
import { IStudent } from './istudent';
import { IGender } from './igender';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.css'],
})
export class CreateStudentComponent {
  public Student: IStudent;
  public Genders: IGender[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private errorService: ErrorService, private router: Router) {
  }

  ngOnInit(): void {
    this.InitEmptyStudent();
    this.LoadGenderList();
  }

  private InitEmptyStudent(): void {
    this.Student = {
      id: undefined,
      genderId: undefined,
      firstName: "",
      lastName: "",
      patronymic: "",
      guid: ""
    }
  }

  private LoadGenderList(): void {
    this.http.get<IGender[]>(this.baseUrl + 'api/Genders/').pipe(
      catchError((err) => this.errorService.handleError(err))
    ).subscribe(result => {
      this.Genders = result;
    });
  }

  public Save(): void {
    this.http.post<IStudent>(this.baseUrl + 'api/Students/', this.Student).pipe(
      catchError((err) => this.errorService.handleError(err))
    ).subscribe(
      result => { },
      error => console.error(error),
      () => this.router.navigate(['/'])
    );
  }
}
