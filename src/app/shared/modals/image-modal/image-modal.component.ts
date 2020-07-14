import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";

@Component({
    selector: 'app-image-modal',
    templateUrl: './image-modal.component.html',
    styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {
    public faDownload = faDownload;
    public file;

    constructor(public modal: NgbActiveModal) {
    }

    ngOnInit() {
        console.log(this.file, 'name')
    }

    // test (x) {
    //     // const url = window.URL.createObjectURL(res);
    //     const a = document.createElement('a');
    //     document.body.appendChild(a);
    //     a.setAttribute('style', 'display: none');
    //     a.href = x.url;
    //     a.download = x.fileName;
    //     a.click();
    //     window.URL.revokeObjectURL(x.url);
    //     a.remove();
    // }

}
