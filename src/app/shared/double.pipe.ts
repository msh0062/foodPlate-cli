import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'double'
})
export class DoublePipe implements PipeTransform {

  transform(value: number): number {
    console.log('ran the pipe')
    return value * 2;
  }

 }
