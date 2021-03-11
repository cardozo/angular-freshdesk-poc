import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { FreshdeskConfig } from "./freshdesk.commons";

@Injectable({
  providedIn: "root"
})
export class FreshDeskApiService {
  constructor(private http: Http) {}

  setTicket(data) {
    let url = FreshdeskConfig.baseURL + "tickets";
    return this.http
      .post(url, data, FreshdeskConfig.options)
      .map((res: any) => res);
  }

  setReply(data, ticketId) {
    let url = FreshdeskConfig.baseURL + "tickets/" + ticketId + "/reply";

    return this.http
      .post(url, data, FreshdeskConfig.options)
      .map((res: any) => res);
  }

  getRequestId(error: any) {
    let xRequestId;
    error.headers._headers.forEach((header: any, key: any) => {
      if (key == "x-request-id") {
        xRequestId = header[0];
      }
    });
    return xRequestId;
  }
}
