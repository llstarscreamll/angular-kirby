import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { Pagination } from '@llstarscreamll/shared';
import { WorkShiftInterface } from './work-shift.interface';
import { BaseAuthService } from '@llstarscreamll/authentication/utils';

@Injectable()
export class WorkShiftService extends BaseAuthService {

  private endpoint = this.env.api + 'api/v1/work-shifts/';

  public constructor(
    @Inject('environment')
    private env,
    private http: HttpClient
  ) { super(); }

  public search(query: any, tokens: any): Observable<Pagination<WorkShiftInterface>> {
    return this.http.get<Pagination<WorkShiftInterface>>(this.endpoint, { headers: this.authHeaders(tokens) });
  }

  public create(workShiftData: any, tokens: any): Observable<WorkShiftInterface> {
    return this.http.post<{ data: WorkShiftInterface }>(this.endpoint, workShiftData, { headers: this.authHeaders(tokens) })
      .pipe(map(response => response.data));
  }

  public get(workShiftId: number, tokens: any): Observable<WorkShiftInterface> {
    return this.http.get<{ data: WorkShiftInterface }>(this.endpoint + workShiftId, { headers: this.authHeaders(tokens) })
      .pipe(map(response => response.data));
  }

  public update(workShiftId: number, workShiftData: any, tokens: any): Observable<WorkShiftInterface> {
    return this.http.put<{ data: WorkShiftInterface }>(this.endpoint + workShiftId, workShiftData, { headers: this.authHeaders(tokens) })
      .pipe(map(response => response.data));
  }

  public delete(workShiftId: number, tokens: any): Observable<any> {
    return this.http.delete(this.endpoint + workShiftId, { headers: this.authHeaders(tokens) });
  }

}
