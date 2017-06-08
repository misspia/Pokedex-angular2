import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class QuickviewService {

	constructor(public http: Http) {
		
	}
	getSummary(id): any {
		return this.http.get("./src/assets/json/" + id + ".json")
		.map((res:Response) => res.json());
	}
}
