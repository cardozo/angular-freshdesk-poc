import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { Http, Headers, RequestOptions } from "@angular/http";
import { HttpModule } from "@angular/http";
import { FreshdeskComponent } from "./freshdesk/freshdesk.component";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [FreshdeskComponent],
  bootstrap: [FreshdeskComponent]
})
export class AppModule {}
