import { Component, VERSION } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import {
  Status,
  Types,
  Priority,
  Source,
  FreshdeskConfig
} from "./freshdesk/freshdesk.commons";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  status: number;
  text: string;
  result: string;
  ticketId: number;

  constructor(private http: Http) {}

  create(file: any) {

    //https://medgrupo.freshdesk.com/a/tickets/filters/all_tickets
    //https://medgrupo.freshdesk.com/a/tickets/613248
    //https://developers.freshdesk.com/api/#reply_ticket

    //https://medgrupo.freshdesk.com/api/v2/ticket_fields

    //https://medgrupo.freshdesk.com/api/v2/tickets/613020/
    //https://medgrupo.freshdesk.com/api/v2/tickets/613020/conversations

    //criar entidade
    let obj = {
      source: Source.Email,
      description: "Descrição de teste",
      name: "Cardozo",
      email: "rod_cardozo@hotmail.com",
      type: Types.reclamacao,
      subject: "Teste desenv",
      priority: Priority.Alta,
      status: Status.Open,
      group_id: 12000006437,
      custom_fields: { cf_matricula: "214669" }
    };
    // console.log(file.files[0]);
    // if (file.files[0] != undefined) {
    //   obj["attachments"] = file.files;
    // }

    this.createTicket(obj).subscribe(
      (res: any) => {
        this.result = "SUCCESS";
        this.status = res.status;
        this.text = JSON.stringify(res._body, null, "<br/>");
        let body = JSON.parse(res._body);
        this.ticketId = body.id;
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

  //colocar numa service
  createReply(file: any) {}

  //colocar numa service
  createTicket(data) {
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
