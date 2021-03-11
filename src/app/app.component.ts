import { Component, VERSION } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import {
  Status,
  Types,
  Priority,
  Source,
  FreshdeskConfig,
  Ticket
} from "./freshdesk/freshdesk.commons";

@Component({
  selector: "freshdesk",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

//https://medgrupo.freshdesk.com/a/tickets/filters/all_tickets
//https://medgrupo.freshdesk.com/a/tickets/613248
//https://developers.freshdesk.com/api/#reply_ticket
//https://medgrupo.freshdesk.com/api/v2/ticket_fields
//https://medgrupo.freshdesk.com/api/v2/tickets/613020/
//https://medgrupo.freshdesk.com/api/v2/tickets/613020/conversations
export class AppComponent {
  status: number;
  text: string;
  result: string;
  ticketId: number;
  requesterId: number;

  constructor(private http: Http) {}

  createTicket(file: any = null) {
    let ticket: Ticket = {
      source: Source.Portal,
      description: "Descrição de teste",
      name: "Cardozo",
      email: "testecardozo@hotmail.com",
      type: Types.reclamacao,
      subject: "Teste desenv",
      priority: Priority.Alta,
      status: Status.Open,
      group_id: 12000006437,
      custom_fields: {
        cf_matricula: "214669",
        cf_ambiente:
          "AppVersion: 7.5.2 AppId: 17 Device: 3 OS: iOS; OSVersion: 12.4.9 uuid: 8561BC1F-1316-4E6C-9547-8BAE7B92B6E5"
      }
    };

    this.createTicketService(ticket).subscribe(
      (res: any) => {
        this.result = "SUCCESS";
        this.status = res.status;
        this.text = JSON.stringify(res._body, null, "<br/>");
        let body = JSON.parse(res._body);
        console.log(body);
        console.log(res);
        this.ticketId = body.id;
        this.requesterId = body.requester_id;
      },
      (error: any) => {
        this.result = "ERROR";
        this.status = error.status;
        this.text =
          "Error Message : <b style='color: red'>" +
          error._body +
          "</b>.<br/> Your X-Request-Id is : <b>" +
          this.getRequestId(error) +
          "</b>. Please contact support@freshdesk.com with this id for more information.";
      }
    );
  }

  createReply(file = null) {
    let data = {
      user_id: this.requesterId,
      body: "teste de réplica externa"
    };

    this.createReplyService(data).subscribe(
      (res: any) => {
        console.log(res);
        this.result = "SUCCESS";
        this.status = res.status;
        this.text = JSON.stringify(res._body, null, "<br/>");
        let body = JSON.parse(res._body);
      },
      (error: any) => {
        this.result = "ERROR";
        this.status = error.status;
        this.text =
          "Error Message : <b style='color: red'>" +
          error._body +
          "</b>.<br/> Your X-Request-Id is : <b>" +
          this.getRequestId(error) +
          "</b>. Please contact support@freshdesk.com with this id for more information.";
      }
    );
  }

  createReplyService(data) {
    let url = FreshdeskConfig.baseURL + "tickets/" + this.ticketId + "/reply";

    return this.http
      .post(url, data, FreshdeskConfig.options)
      .map((res: any) => res);
  }

  createTicketService(data) {
    let url = FreshdeskConfig.baseURL + "tickets";
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
