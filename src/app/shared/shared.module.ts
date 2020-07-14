import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ImagePreviewPipe } from "./pipes/image-preview.pipe";
import { ImageModalComponent } from './modals/image-modal/image-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToUpperCaseFirstLetterPipe } from './pipes/to-upper-case-first-letter.pipe';


@NgModule({
    declarations: [
        ImagePreviewPipe,
        ImageModalComponent,
        ToUpperCaseFirstLetterPipe
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule
    ],
    exports: [
        ImagePreviewPipe,
        ImageModalComponent,
        ToUpperCaseFirstLetterPipe
    ]
})
export class SharedModule {
}
