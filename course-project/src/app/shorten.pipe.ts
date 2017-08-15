import { PipeTransform, Pipe } from "@angular/core";
// add decorator to define it is a pipe, to be used on template.
// Don't forget to add this on app module declaration
@Pipe({
  name: 'shorten',
})
// use PipeTransform interface and use transform method
export class ShortenPipe implements PipeTransform {

  transform(value: any, limit: number) {
    if (value.length > limit) {
      return value.substr(0, limit) + ' ...';
    }
    return value;
  }
}