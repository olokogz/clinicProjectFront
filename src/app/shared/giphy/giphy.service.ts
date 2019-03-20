import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  giphyApi = '//api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=1&q=';

  constructor(public http: HttpClient) { }

  get(serachTerm)
  {
    const apiLink = this.giphyApi+serachTerm;
    return this.http.get(apiLink).pipe(map((respone: any)=>{
      if(respone.data.length>0)
      {
        return respone.data[0].images.original.url;
      }else
      return 'https://media.giphy.com/media/YaOxRsmrv9IeA/giphy.gif';
    }))
  }
}
