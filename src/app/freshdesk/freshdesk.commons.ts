import { Http, Headers, RequestOptions } from "@angular/http";

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

//Ref:https://support.freshdesk.com/support/solutions/articles/215517-how-to-find-your-api-key
export class FreshdeskConfig {
  static domain = "medgrupo";
  static api_key = "z5Dayu0bzRgkw9x3PuE";
  static baseURL =
    "https://" + FreshdeskConfig.domain + ".freshdesk.com/api/v2/";
  static headers = new Headers({
    Authorization: "Basic " + btoa(FreshdeskConfig.api_key + ":x"),
    "Content-type": "multipart/form-data"
  });
  static options = new RequestOptions({ headers: FreshdeskConfig.headers });
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
