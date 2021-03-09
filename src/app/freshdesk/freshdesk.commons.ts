export enum Priority {
  Baixa,
  Media,
  Alta,
  Urgente
}

export class Types {
  static reclamacao: string = "Reclamação";
  static solicitacao: string = "Solicitação";
  static informacao: string = "Informação";
  static elogio: string = "Elogio";
  static sugestao: string = "Sugestão";
}

export enum Status {
  Open = 2,
  Pending = 3,
  Resolved = 4,
  Closed = 5
}

export enum Source {
  Email = 1,
  Portal = 2,
  Phone = 3,
  Chat = 7,
  FeedbackWidget = 9,
  OutboundEmail = 10
}
