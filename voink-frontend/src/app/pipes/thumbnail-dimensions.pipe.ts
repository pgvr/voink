import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
    name: "thumbnailDimensions",
})
export class ThumbnailDimensionsPipe implements PipeTransform {
    transform(value: string, dimensions: number[]): string {
        value = value.replace("%{width}", dimensions[0].toString())
        value = value.replace("%{height}", dimensions[1].toString())
        return value
    }
}
