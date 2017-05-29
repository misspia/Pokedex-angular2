import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leadingZero'
})
export class LeadingZeroPipe implements PipeTransform {

  transform(value: any): any {
	let num = parseInt(value);

	 if(num >= 100) {
	 	return num;
	 } else if( num >= 10) {
	 	return "0" + num;
	 } else {
	 	return "00" + num;
	 }
  }
}