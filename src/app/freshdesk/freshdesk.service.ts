import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationEnd } from "@angular/router";
import {
  Status,
  Types,
  Priority,
  Source,
  FreshdeskConfig,
  Ticket
} from "./freshdesk.commons";
import { Observable } from "rxjs";

// @Injectable({ providedIn: "root" })
export class FreshdeskService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private freshdeskConfig: FreshdeskConfig
  ) {}

  createReplyHTTP(data, ticketId) {
    let url = FreshdeskConfig.baseURL + "tickets/" + ticketId + "/reply";

    // return this.http
    //   .post(url, data, FreshdeskConfig.options)
    //   .map((res: any) => res);
  }

  createTicket(data) {
    console.log("create ticket");

    // let url = FreshdeskConfig.baseURL + "tickets";
    // return this.http
    //   .post(url, data, FreshdeskConfig.options)
    //   .map((res: any) => res);
  }
}
