import { Component, OnInit } from '@angular/core';
import { IClient } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { PagesService } from '../../services/pages.service';
import { NgForm } from '@angular/forms';
import { ClientModel } from '../../models/client.model';

import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bodyClient: ClientModel;

  dataClient: IClient[] = [];
  loadData = false;
  pagination = {
    currentPage : 1,
    pages : [],
    totalPages: 0
  };
  titleModal = 'Nuevo cliente';
  textButton = 'Guardar';

  infoPage = 'Mostrando de 0 al 0 de 0 registros.';

  constructor(private cliSvc: ClientService, private pagesSvc: PagesService) { }

  ngOnInit() {
    this.bodyClient = new ClientModel();
    this.onGetClient( 1 );
  }

  onGetClient(page: number) {
    this.cliSvc.onGetListClient(page, '', '', '', true).subscribe( (res) => {
      if (!res.ok) {
        throw new Error( res.error );
      }

      this.pagination = this.pagesSvc.getPager( res.total, page, 10 );

      this.dataClient = res.data;

      if ( this.pagination.totalPages > 0 ) {

        const start = ((page - 1) * 10) + 1;
        const end = ((page - 1) * 10) + this.dataClient.length;
        this.infoPage = `Mostrando del ${ start } al ${ end } de ${ res.total } registros.`;
      }
    });
  }

  onEdit( id: number ) {
    const finded = this.dataClient.find( item => item.pkClient === id );
    if (!finded) {
      throw new Error('No se encontro registro');
    }

    console.log(finded);
    this.loadData = true;
    this.bodyClient.pkClient = id;
    this.bodyClient.name = finded.name;
    this.bodyClient.surname = finded.surname;
    this.bodyClient.sex = finded.sex;
    this.bodyClient.phone = finded.phone;
    this.bodyClient.pensionSystem = finded.pensionSystem;
    this.bodyClient.salary = finded.salary;
    this.bodyClient.statusRegister = finded.statusRegister;

  }

  onSubmit( frm: NgForm ) {
    if (frm.valid) {
      console.log(frm);
      console.log(this.bodyClient);

      if ( this.loadData === false) {

        this.cliSvc.onAddClient( this.bodyClient ).subscribe( (res) => {
          if (!res.ok) {
            throw new Error( res.error );
          }
          const {msg, css } = this.onGetError( res.data.showError );
          this.onShowAlert( msg, css );
          if (res.data.showError === 0) {
            this.onGetClient(1);
          }
          console.log(res);

          $('#btnCloseModal').trigger('click');
        });

      } else {
        this.cliSvc.onUpdateClient( this.bodyClient ).subscribe( (res) => {
          if (!res.ok) {
            throw new Error( res.error );
          }
          let {msg, css } = this.onGetError( res.data.showError );
          if (res.data.showError === 0) {
            this.onGetClient(1);
            msg = 'Se actualizó un cliente exitosamente';
          }
          this.onShowAlert( msg, css );
          console.log(res);

          $('#btnCloseModal').trigger('click');
        });
      }


    }
  }

  onLoadDelete( id: number ) {
    const finded = this.dataClient.find( item => item.pkClient === id );
    if (!finded) {
      throw new Error('No se encontro registro');
    }

    console.log(finded);
    this.loadData = true;
    this.bodyClient.pkClient = id;
    this.bodyClient.statusRegister = !finded.statusRegister;
  }

  onDelete() {
    this.cliSvc.onDeleteClient( this.bodyClient ).subscribe( (res) => {
      if (!res.ok) {
        throw new Error( res.error );
      }
      let {msg, css } = this.onGetError( res.data.showError );
      if (res.data.showError === 0) {
        this.onGetClient(1);
        msg = 'Se ha eliminado un cliente exitosamente';
      }
      console.log(res);
      this.onShowAlert( msg, css );

      $('#btnCloseConfirm').trigger('click');
    });
  }

  onReset() {
    $('#frmClient').trigger('reset');
    this.bodyClient.onReset();
  }

  onShowAlert(msg: string, css = 'success') {
    let html = `<div class="alert alert-${ css } alert-dismissible fade show" role="alert">
     ${msg}.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>`;

    $('#alertClient').html(html);
  }

  onGetError(showError: number) {
    const arrError = showError === 0 ? ['Se creo un nuevo cliente exitosamente'] : ['Error'];
    const css = showError === 0 ? 'success' : 'danger';
    // tslint:disable-next-line: no-bitwise
    if (showError & 1) {
      arrError.push('no se encontró registro de cliente');
    }

    // tslint:disable-next-line: no-bitwise
    if (showError & 2) {
      arrError.push('cliente inactivo');
    }

    return {msg: arrError.join(', '), css};
  }

}
