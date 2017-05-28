import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class MainListService {
	constructor(public http: Http) {

	}
	getList(): any {

		return this.http.get("./src/app/main-list/pokemon.json")
        .map((res:Response) => res.json());
	}

}
