import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface IAbilities {
  ability: { name: string }
}

interface ISprites {
  front_default: string
}

interface IMove {
  move: { name: string }
}

interface IPokemonDetail {
  name: string,
  abilities: IAbilities,
  moves: IMove[],
  height: number,
  weight: number,
  sprites: ISprites
}

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokeId: string;
  pokeDetail: IPokemonDetail;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    route.paramMap.subscribe(map => {
      this.pokeId = map.get('id');
    });
  }

  ngOnInit() {
    this.getDetails();
  }

  async getDetails() {
    await this.http.get<IPokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${this.pokeId}`).subscribe(res => {
      this.pokeDetail = res;
    });
  }

}
