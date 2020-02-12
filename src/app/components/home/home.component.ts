import { SpotifyService } from "src/app/services/spotify.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  token = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit() {
    this.activatedRoute.fragment
      .pipe(
        map(fragment => new URLSearchParams(fragment)),
        map(params => ({
          access_token: params.get("access_token")
        }))
      )
      .subscribe(res => {
        this.token = res.access_token;
      });
  }

  getPlaylistsClick() {
    this.spotifyService
      .getUserPlaylists(this.token)
      .subscribe(res => console.log(res));
  }
}
