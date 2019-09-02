import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { BaseService } from '@llstarscreamll/shared';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class NoveltyService extends BaseService {
  private endpoint = this.env.api + 'api/v1/novelties/';

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

  public searchNoveltyTypes(query: any = {}): Observable<any> {
    const endpoint = this.env.api + 'api/v1/novelty-types/';
    return this.http.get<any>(endpoint, {
      headers: this.defaultHeaders,
      params: query
    });
  }

  public createNoveltiesToEmployees(data: any): Observable<any> {
    const endpoint = this.endpoint + 'create-novelties-to-users';
    return this.http
      .post<any>(endpoint, data, { headers: this.defaultHeaders })
      .pipe(map(response => response.data));
  }

  public get(id: string): Observable<any> {
    const endpoint = this.endpoint + id;
    return this.http
      .get<any>(endpoint, { headers: this.defaultHeaders })
      .pipe(map(response => response.data));
  }

  public update(id: string, noveltyData: any): Observable<any> {
    const endpoint = this.endpoint + id;
    return this.http
      .put<any>(endpoint, noveltyData, { headers: this.defaultHeaders })
      .pipe(map(response => response.data));
  }
}