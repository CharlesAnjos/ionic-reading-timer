import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'hoursMinutesSeconds',
})
@Injectable()
export class HoursMinutesSecondsPipe implements PipeTransform {
  transform(value, ...args) {
    let minutes = Math.floor(value / 60);
    let hours = Math.floor(minutes / 60);
    let seconds = Math.floor(value%60);
    return hours + "h, " + minutes + "m, " + seconds + "s";
  }
}
