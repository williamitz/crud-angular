import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ClientModel } from '../models/client.model';
import { IResponse } from '../interfaces/response.interface';

const URI_API = environment.URL_SERVER;

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  onAddClient( body: ClientModel ) {
    return this.http.post<IResponse>(URI_API + `/client/add`, body);
  }

  onUpdateClient( body: ClientModel ) {
    return this.http.put<IResponse>(URI_API + `/client/update/${ body.pkClient }`, body);
  }

  onDeleteClient( body: ClientModel ) {
    return this.http.delete<IResponse>(URI_API + `/client/delete/${ body.pkClient }/${ body.statusRegister }`);
  }

  onGetListClient( page: number, q = '', qSex = '', qPension = '', showInactive: boolean ) {
    const params = `?page=${ page }&q=${ q }&qSex=${ qSex }&qPension=${ qPension }&showInactive=${ showInactive }`;
    return this.http.get<IResponse>(URI_API + `/client/list${ params }`);
  }

}
