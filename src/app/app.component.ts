import { Component, VERSION } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";

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
    let formdata = new FormData();
    formdata.append("description", "sample description");
    formdata.append("email", "test@mydomain.com");
    formdata.append("subject", "Test subject");
    formdata.append("priority", "2");
    formdata.append("status", "2");
    formdata.append("attachments[]", file.files[0]);
    formdata.append("custom_fields[cf_test_ddpp_1]", "First Choice");
    formdata.append("custom_fields[cf_test_service_worker]", "First Choice");

    this.create(formdata).subscribe(
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

  create(data: FormData) {
    let yourdomain = "mydomain"; // Your freshdesk domain name. Ex., yourcompany
    let api_key = "key"; // Ref: https://support.freshdesk.com/support/solutions/articles/215517-how-to-find-your-api-key
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
