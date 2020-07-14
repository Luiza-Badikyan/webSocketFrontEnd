import {Pipe, PipeTransform, Renderer2} from '@angular/core';

@Pipe({
    name: 'imagePreview'
})
export class ImagePreviewPipe implements PipeTransform {
    constructor(
        private renderer2: Renderer2
    ) {
    }

    transform(file, imgRef, loaderRef?) {
        const reader = new FileReader();
        reader.onload = () => {
            this.renderer2.setStyle(imgRef, 'opacity', 0);
            this.renderer2.setStyle(loaderRef, 'opacity', 1);
        };

        reader.onloadend = () => {
            // imgRef.src = reader.result;
            this.renderer2.setAttribute(imgRef, 'src', reader.result.toString());
            this.renderer2.setStyle(imgRef, 'opacity', 1);
            this.renderer2.setStyle(loaderRef, 'opacity', 1);
        };
        if (file) {


            reader.readAsDataURL(file);
        }
    }
}
