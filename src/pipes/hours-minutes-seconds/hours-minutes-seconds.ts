import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'hoursMinutesSeconds',
})
@Injectable()
export class HoursMinutesSecondsPipe implements PipeTransform {
  transform(value, ...args) {
    let hours = Math.floor(value / 3600);
    let minutes = Math.floor((value-(hours*3600))/60);
    let seconds = Math.floor(value%60);

    return hours + "h, " + minutes + "m, " + seconds + "s";
  }
}
