import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '@kirby/shared';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class EmployeeService extends BaseService {
  private endpoint = this.env.api + 'api/v1/employees/';

  public constructor(
    @Inject('environment')
    private env,
    private http: HttpClient
  ) {
    super();
  }

  public search(query: any = {}): Observable<any> {
    return this.http.get<any>(this.endpoint, {
      headers: this.defaultHeaders,
      params: query
    });
  }

  public get(id: string): Observable<any> {
    return this.http
      .get<any>(this.endpoint + id, {
        headers: this.defaultHeaders
      })
      .pipe(map(response => response.data));
  }

  public update(employeeId: string, data: any): Observable<any> {
    return this.http
      .put<any>(this.endpoint + employeeId, data, {
        headers: this.defaultHeaders
      })
      .pipe(map(response => response.data));
  }

  public syncEmployeesByCsvFile(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('csv_file', data.csv_file);
    return this.http.post(this.endpoint + 'sync-by-csv-file', formData);
  }
}
