import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  token: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.token = this.activatedRoute.snapshot.queryParams["code"];
  }
}
