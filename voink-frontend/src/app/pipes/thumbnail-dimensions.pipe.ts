import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thumbnailDimensions'
})
export class ThumbnailDimensionsPipe implements PipeTransform {

  //https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/9d913c1ebe12e8bfde24_trymacs_716686577_44849692/thumb/thumb0-320x240.jpg
  //"https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/9d913c1ebe12e8bfde24_trymacs_716686577_44849692/thumb/thumb0-%{width}x%{height}.jpg"
  transform(value: string, width = 320, height: 240): unknown {
    let result = ""
    result = value.replace("%{width}", width.toString())
    result = value.replace("%{height}", height.toString())
    return result
  }

}
