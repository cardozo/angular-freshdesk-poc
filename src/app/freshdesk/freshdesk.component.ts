import { Component, VERSION } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { FreshDeskApiService } from "./freshdesk.api";
import {
  FreshdeskConfig,
  Priority,
  Source,
  Status,
  Ticket,
  Types
} from "./freshdesk.commons";

@Component({
  selector: "freshdesk",
  templateUrl: "./freshdesk.component.html"
})
//links úteis
//https://medgrupo.freshdesk.com/a/tickets/filters/all_tickets
//https://medgrupo.freshdesk.com/a/tickets/613248
//https://developers.freshdesk.com/api/#reply_ticket
//https://medgrupo.freshdesk.com/api/v2/ticket_fields

//dois gets
//https://medgrupo.freshdesk.com/api/v2/tickets/613020/
//https://medgrupo.freshdesk.com/api/v2/tickets/613020/conversations
//
export class FreshdeskComponent {
  status: number;
  text: string;
  result: string;

  ticketId: number;
  requesterId: number;

  constructor(
    private http: Http,
    private freshDeskApiService: FreshDeskApiService
  ) {}

  createTicket(file: any = null) {
    let ticket: Ticket = {
      source: Source.Portal,
      description:
        "Descrição de teste para relato detalhado do problema do aluno",
      name: "Cardozo",
      email: "testecardozo@hotmail.com",
      type: Types.reclamacao,
      subject: "Título de teste Desenv",
      priority: Priority.Alta,
      status: Status.Open,
      group_id: 12000006437,
      custom_fields: {
        cf_matricula: "214669",
        cf_ambiente:
          "AppVersion: 7.5.2 AppId: 17 Device: 3 OS: iOS; OSVersion: 12.4.9 uuid: 8561BC1F-1316-4E6C-9547-8BAE7B92B6E5",
        cf_1: "MEDSOFT Pro",
        cf_11: "Login",
        cf_111: "Erro de Senha"
      }
    };

    this.freshDeskApiService.setTicket(ticket).subscribe(
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
          this.freshDeskApiService.getRequestId(error) +
          "</b>. Please contact support@freshdesk.com with this id for more information.";
      }
    );
  }

  createReply(file = null) {
    let data = {
      user_id: this.requesterId,
      body: "teste de réplica externa"
    };

    this.freshDeskApiService.setReply(data, this.ticketId).subscribe(
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
          this.freshDeskApiService.getRequestId(error) +
          "</b>. Please contact support@freshdesk.com with this id for more information.";
      }
    );
  }
}
