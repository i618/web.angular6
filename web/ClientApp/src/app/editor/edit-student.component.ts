import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from '../error.service';
import { catchError } from 'rxjs/operators';
import { IStudent } from './istudent';
import { IGender } from './igender';

@Component({
  selector: 'app-edit',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.css'],
})
export class EdiStudentComponent {
  private Id: number;
  public Student: IStudent;
  public Genders: IGender[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private route: ActivatedRoute, private errorService: ErrorService, private router: Router) {
    this.Id = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.Id = this.route.snapshot.params['id'];
    this.LoadStudent();
    this.LoadGenderList();
  }

  private LoadStudent(): void {
    this.http.get<IStudent>(this.baseUrl + 'api/Students/' + this.Id).pipe(
      catchError((err) => this.errorService.handleError(err))
    ).subscribe(result => {
      this.Student = result;
    });
  }

  private LoadGenderList(): void {
    this.http.get<IGender[]>(this.baseUrl + 'api/Genders/').pipe(
      catchError((err) => this.errorService.handleError(err))
    ).subscribe(result => {
      this.Genders = result;
    });
  }

  public Save(): void {
    this.http.put<IStudent>(this.baseUrl + 'api/Students/' + this.Id, this.Student).pipe(
      catchError((err) => this.errorService.handleError(err))
    ).subscribe(
      result => { },
      error => console.error(error),
      () => this.router.navigate(['/'])
    );
  }
}
