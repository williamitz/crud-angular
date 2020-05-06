import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IResponse } from '../interfaces/response.interface';
const URI_API = environment.URL_SERVER;
@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  onChartBar() {
    return this.http.get<IResponse>(URI_API + `/client/chartBar`);
  }

  onChartPie() {
    return this.http.get<IResponse>(URI_API + `/client/chartPension`);
  }


}
