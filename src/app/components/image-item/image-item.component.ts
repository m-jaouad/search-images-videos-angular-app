import { Component, Input, OnInit, Output } from '@angular/core';
import { DialogService } from 'src/app/dialog/dialog.service';
import { EventEmitter } from '@angular/core';
import { ShowImageComponent } from '../show-image/show-image.component';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.css'],
})
export class ImageItemComponent implements OnInit {
  @Input() img!: string;
  @Input() imgLarge!: string;
  @Input() tags!: string;
  tagsList!: string[];
  @Input() index!: number;

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(public dialog: DialogService) {}

  ngOnInit(): void {
    this.tagsList = this.tags.split(',');
  }

  tagSearch(tag: string) {
    this.newItemEvent.emit(tag);
  }

  showImage(url: string) {
    const ref = this.dialog.open(ShowImageComponent, {
      data: {
        url: url,
        index: this.index,
      },
    });
    console.log('Index is : ' + this.index);
  }
}
