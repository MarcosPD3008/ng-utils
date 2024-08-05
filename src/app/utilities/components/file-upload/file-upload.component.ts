import { Component, EventEmitter, Input, Output, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  private _files: File[] = [];

  @Input() accept: string = ''; // accepted file extensions, e.g., '.jpg,.png,.pdf'
  @Input() multiple: boolean = true; // whether multiple files are accepted

  @Input()
  get files(): File[] {
    return this._files;
  }

  set files(files: File[]) {
    this._files = files;
    this.filesChange.emit(this._files);
  }

  @Output() filesChange = new EventEmitter<File[]>();
  @Output() filesDropped = new EventEmitter<File[]>();

  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  isDragging = false;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const files = Array.from(event.dataTransfer.files);
      const acceptedFiles = this.filterFiles(files);

      if (acceptedFiles.length > 0) {
        this.files = this.multiple ? this.files.concat(acceptedFiles) : [acceptedFiles[0]];
        this.filesDropped.emit(this.files);
      }
    }
  }

  onClick(): void {
    this.fileInput?.nativeElement.click();
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      const acceptedFiles = this.filterFiles(files);

      if (acceptedFiles.length > 0) {
        this.files = this.multiple ? this.files.concat(acceptedFiles) : [acceptedFiles[0]];
        this.filesDropped.emit(this.files);
      }
    }
    if(this.fileInput)
      this.fileInput.nativeElement.value = '';
  }

  onRemoveFile(file: File): void {
    this.files = this.files.filter(f => f !== file);
    this.filesChange.emit(this.files);

    if(this.fileInput)
      this.fileInput.nativeElement.value = '';
  }

  filterFiles(files: File[]): File[] {
    if (!this.accept) {
      return files;
    }
    const acceptedExtensions = this.accept.split(',').map(ext => ext.trim().toLowerCase());
    return files.filter(file =>
      acceptedExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
    );
  }
}