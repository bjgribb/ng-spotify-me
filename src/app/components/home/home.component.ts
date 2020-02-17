import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  token: string;
  playlists: any;
  routeQueryParams$: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.fragment
      .pipe(
        map(fragment => new URLSearchParams(fragment)),
        map(params => ({
          access_token: params.get('access_token')
        }))
      )
      .subscribe(res => {
        this.token = res.access_token;
        if (!this.token) {
          this.router.navigate(['home/dialog']);
        }
      });
  }

  getPlaylistsClick() {
    this.spotifyService.getUserPlaylists(this.token).subscribe(playlist => {
      this.playlists = playlist.items;
    });
  }
}
