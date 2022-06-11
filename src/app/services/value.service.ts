import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValueService {
  _agents: any = [];

  set agents(agents: any) {
    this._agents = agents;
  }
  get agents() {
    return this._agents;
  }
  constructor() {}
}
