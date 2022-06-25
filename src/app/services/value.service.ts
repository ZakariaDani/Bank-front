import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValueService {
  private _agents: any = [];
  private _bookmarked: any = [];

  set agents(agents: any) {
    this._agents = agents;
  }
  get agents() {
    return this._agents;
  }

  set bookmarked(agents: any) {
    this._bookmarked = agents;
  }
  get bookmarked() {
    return this._bookmarked;
  }
  constructor() {}
}
