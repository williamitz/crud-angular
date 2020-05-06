export enum EPension {
  AFP = 'AFP',
  ONP = 'ONP'
}

export enum ESex {
  F = 'F',
  M = 'M',
  O = 'O'
}

export class ClientModel {
  pkClient: number;
  name: string;
  surname: string;
  sex: string;
  pensionSystem: string;
  phone: string;
  salary: number;
  statusRegister: boolean;

  constructor() {
    this.pkClient = 0;
    this.name = '';
    this.surname = '';
    this.sex = ESex.M;
    this.pensionSystem = EPension.AFP;
    this.phone = '';
    this.salary = 0;
    this.statusRegister = true;
  }

  onReset() {
    this.pkClient = 0;
    this.name = '';
    this.surname = '';
    this.sex = ESex.M;
    this.pensionSystem = EPension.AFP;
    this.phone = '';
    this.salary = 0;
    this.statusRegister = true;
  }
}
