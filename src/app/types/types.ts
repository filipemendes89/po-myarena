export interface IReservation {
    _id: string;
    createdAt: string;
    courtId: string;
    time: string;
    classId: string;
    date: string;
    active: boolean;
    tenantId: string;
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
    }[];
    __v: number;
    isItFull: boolean;
    poType?: string;
    poValue?: string
}

export interface IAvailableCourt {
    courtName: string;
    hours: {
      entryTime: string;
      exitTime: string;
      _id: string;
    }[];
    avatar: string;
    courtId: string;
  }