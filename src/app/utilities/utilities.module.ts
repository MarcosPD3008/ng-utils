import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CustomSvgComponent } from './components/custom-svg/custom-svg.component';
import { DebounceDirective } from './directives/debounce.directive';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { DebounceClickDirective } from './directives/debounceClick.directive';
import { TruncateStringDirective } from './directives/truncateString.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        PaginationComponent,
        CustomSvgComponent,
        FileUploadComponent,
        DebounceDirective,
        DebounceClickDirective,
        TruncateStringDirective
    ],
    declarations: [
        PaginationComponent,
        CustomSvgComponent,
        FileUploadComponent,
        DebounceDirective,
        DebounceClickDirective,
        TruncateStringDirective
    ],
    providers: [],
})
export class UtilitiesModule { }
