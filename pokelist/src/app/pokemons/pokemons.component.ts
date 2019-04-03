import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';

interface IPokemon {
  name: string,
  url: string,
  id: number
}

interface IResponse {
  count?: number,
  results: IPokemon[]
}

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'details'];
  pokemons: IResponse;
  dataSource = new MatTableDataSource();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPokemons();
  }

  async getPokemons() {
    // limit to 800 because following pokemon-ids respond with error 404, even if counts is >900
    await this.http.get<IResponse>("https://pokeapi.co/api/v2/pokemon?limit=800").subscribe(res => {
      this.pokemons = res;
      for (let i = 0; i < this.pokemons.results.length; i++) {
        this.pokemons.results[i].id = i + 1;
      }
      this.dataSource = new MatTableDataSource(this.pokemons.results);
    });
  }

  applyFilter(searchVal: string) {
    this.dataSource.filter = searchVal.trim().toLowerCase();
  }
}
