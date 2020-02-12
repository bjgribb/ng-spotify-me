import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  token: string;
  playlists: any;

  constructor(
    private activatedRoute: ActivatedRoute,
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
    this.spotifyService.getUserPlaylists(this.token).subscribe(playlist => {
      this.playlists = playlist.items;
    });
  }
}
