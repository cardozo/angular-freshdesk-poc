import { Component, VERSION } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Status, Types, Priority, Source } from "./freshdesk/freshdesk.commons";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  status: number;
  text: string;
  result: string;

  constructor(private http: Http) {}

  createTicket(file: any) {
    //https://medgrupo.freshdesk.com/api/v2/ticket_fields
    //https://medgrupo.freshdesk.com/api/v2/tickets/613020/conversations

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

    // formdata.append("cc_emails", []]);
    //https://medgrupo.freshdesk.com/api/v2/groups?per_page=100

    //formdata.append("attachments[]", );
    //formdata.append("custom_fields[matricula]", "123456789");
    //formdata.append("custom_fields[cf_test_service_worker]", "First Choice");

    this.create(obj).subscribe(
      (res: any) => {
        this.result = "SUCCESS";
        this.status = res.status;
        this.text = JSON.stringify(res._body, null, "<br/>");
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

  create(data) {
    let yourdomain = "medgrupo";
    let api_key = "z5Dayu0bzRgkw9x3PuE";
    // Ref:https://support.freshdesk.com/support/solutions/articles/215517-how-to-find-your-api-key
    let url = "https://" + yourdomain + ".freshdesk.com/api/v2/tickets";

    let headers = new Headers({
      Authorization: "Basic " + btoa(api_key + ":x")
    });

    let options = new RequestOptions({
      headers: headers
    });

    return this.http.post(url, data, options).map((res: any) => res);
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
