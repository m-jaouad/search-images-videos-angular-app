import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DialogConfig } from 'src/app/dialog/dialog-config';
import { DialogRef } from 'src/app/dialog/dialog-ref';
import { DialogService } from 'src/app/dialog/dialog.service';
import { ResourcesService } from 'src/app/services/resources.service';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css'],
})
export class ShowImageComponent implements OnInit {
  constructor(
    public dialog: DialogRef,
    public config: DialogConfig,
    public dialogService: DialogService,
    public resourcesService: ResourcesService,
    private httpClient: HttpClient
  ) {}
  url!: string;
  index!: number;
  ngOnInit(): void {
    this.url = this.config.data.url;
    this.index = this.config.data.index;
  }

  onClose() {
    this.dialog.close('some value');
  }

  showNext() {
    if (this.index == this.resourcesService.hits.length - 1) return;
    this.index = this.index + 1;

    this.url = this.resourcesService.hits[this.index].largeImageURL;
  }

  showPrevious() {
    if (this.index == 0) return;
    this.index = this.index - 1;
    this.url = this.resourcesService.hits[this.index].largeImageURL;
  }

  downloadImage(imgUrl: string) {
    this.httpClient
      .get(imgUrl, { responseType: 'blob' as 'json' })
      .subscribe((res: any) => {
        const file = new Blob([res], { type: res.type });

        const blob = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = blob;
        link.download = 'hello';

        // Version link.click() to work at firefox
        link.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );

        setTimeout(() => {
          // firefox
          window.URL.revokeObjectURL(blob);
          link.remove();
        }, 100);
      });
  }
}
