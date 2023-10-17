export interface IReservation {
    _id: string;
    createdAt: string;
    courtId: {
        _id: string;
        createdAt: string;
        name: string;
        avatar: string;
        courtId: string;
    };
    time: string;
    classId: {
        _id: string;
        createdAt: string;
        sport: string;
        teacherId: {
            _id: string;
            createdAt: string;
            nome: string;
            email: string;
            dtNascimento: string;
            genero: string;
            nacionalidade: string;
            cpf: string;
            phone: string;
            avatar: string;
            sports: string[];
            tipo: string;
            instagram: string;
            tenantId: string;
            __v: number;
        }
    };
    date: string;
    active: boolean;
    tenantId: string;
    reserverId?: {
        _id: string;
        createdAt: string;
        nome: string;
        email: string;
        dtNascimento: string;
        genero: string;
        nacionalidade: string;
        cpf: string;
        phone: string;
        avatar: string;
        sports: string[];
        tipo: string;
        instagram: string;
        tenantId: string;
        __v: number;
    };
    __v: number;
  };

export interface IClass {
    _id: string;
    createdAt: string;
    sport: string;
    date: string;
    courtId: string;
    teacherId: string;
    time: string;
    people: number;
    level: string;
    court: string;
    tenantId: string;
    peopleList: {
      nome: string;
      at: string;
      _id: string;
      status?: string
    }[];
    __v: number;
    isItFull: boolean;
    poType?: string;
    poValue?: string
}

export type IHour = {
  entryTime: string;
  exitTime: string;
  _id: string;
}
export interface IAvailableCourt {
    courtName: string;
    hours: IHour[];
    avatar: string;
    courtId: string;
}

export interface IPeople {
  _id: string;
  createdAt: string;
  nome: string;
  email: string;
  dtNascimento: string;
  genero: string;
  nacionalidade: string;
  cpf: string;
  phone: string;
  avatar: string;
  sports: string[];
  tipo: string;
  instagram: string;
  tenantId: string;
  __v: number;
}

export interface ICourt {
  events?: any
  _id: string;
  createdAt: string;
  name: string;
  avatar: string;
  type: string;
  sports: string[];
  active: boolean;
  calendar: string;
  tenantId: string;
  __v: number;
}