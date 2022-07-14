import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = 'Qd3FOYey4MoA3J0bl7qKfRmIRLNFFJ9G';
  private _historial: string[] = [];


  get historial(){

    return [...this._historial];
  }


  constructor (private http: HttpClient){}


  buscarGifs( query: string ='') {

    query = query.trim().toLocaleLowerCase();

    if ( !this._historial.includes(query )){
      this._historial.unshift( query);
      this._historial = this._historial.splice(0,10);
    }


    this.http.get('https://api.giphy.com/v1/gifs/search?api_key=Qd3FOYey4MoA3J0bl7qKfRmIRLNFFJ9G&q=Dragon Ball z&limit=10')
    .subscribe( resp => {
      console.log(resp);
    } )
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
