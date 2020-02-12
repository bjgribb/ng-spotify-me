import { HttpClient } from "@angular/common/http";
import { Component, OnInit, OnChanges } from "@angular/core";
import { SpotifyService } from "src/app/services/spotify.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  response: any;
  constructor(
    private spotifyService: SpotifyService,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let token = this.activatedRoute.snapshot.queryParams["code"];
  }

  loginClick() {
    this.spotifyService.getAuth();
  }
}
