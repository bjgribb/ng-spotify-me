import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

//"https://accounts.spotify.com/authorize?client_id=9d1bb998f8a64aa69c40289b96af33eb&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fcallback%2F&scope=user-read-private%20user-read-email&state=34fFs29kd09",

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;

  constructor(private http: HttpClient) {}

  getAuth() {
    const baseURL = 'https://accounts.spotify.com/authorize';

    const httpOptions = {
      params: new HttpParams()
        .set('client_id', this.clientId)
        .set('response_type', 'token')
        .set('redirect_uri', 'http://localhost:4200/callback/')
        .set('scope', 'user-read-private, user-read-email, playlist-read-private, playlist-read-collaborative')
    };

    // const httpOptions = {
    //   params: {
    //     client_id: this.clientId,
    //     response_type: "token",
    //     redirect_uri: "http://localhost:4200/callback/",
    //     scope:
    //       "user-read-private, user-read-email, playlist-read-private, playlist-read-collaborative"
    //   }
    // };
    // return this.http.get(baseURL, httpOptions);

    return location.replace(`${baseURL}?${httpOptions.params.toString()}`);
  }

  getUserPlaylists(token) {
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const basePlaylistURL = 'https://api.spotify.com/v1/me/playlists';

    return this.http.get<PlaylistData>(basePlaylistURL, httpOptions);
  }
}

interface PlaylistData {
  href: string;
  items: any[];
}
