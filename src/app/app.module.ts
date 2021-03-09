import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { Http, Headers, RequestOptions } from "@angular/http";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
