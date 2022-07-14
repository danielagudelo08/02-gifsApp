import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = 'Qd3FOYey4MoA3J0bl7qKfRmIRLNFFJ9G';
  private servicioURL: string ='https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];


  public resultado: Gif[] = [];


  get historial(){

    return [...this._historial];
  }


  constructor (private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultado = JSON.parse(localStorage.getItem('resultados')!) || [];
  }


  buscarGifs( query: string ='') {

    query = query.trim().toLocaleLowerCase();

    if ( !this._historial.includes(query )){
      this._historial.unshift( query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify (this._historial) );
    }

    const params = new HttpParams().set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query );


    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, {params})
    .subscribe( (resp ) => {
      //console.log(resp.data);
      this.resultado = resp.data;

      localStorage.setItem('resultados', JSON.stringify (this.resultado) );
    } );

    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=Qd3FOYey4MoA3J0bl7qKfRmIRLNFFJ9G&q=Dragon Ball z&limit=10')
    // const data = await resp.json();
    // console.log(data);

  //  fetch('https://api.giphy.com/v1/gifs/search?api_key=Qd3FOYey4MoA3J0bl7qKfRmIRLNFFJ9G&q=Dragon Ball z&limit=10')
  //    .then( resp => {
  //     resp.json().then( data =>{
  //       console.log(data);
  //     })
  //    })

  }

}
