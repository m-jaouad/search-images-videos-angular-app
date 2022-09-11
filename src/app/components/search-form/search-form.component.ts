import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ResourcesService } from 'src/app/services/resources.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  isClicked: boolean = false;
  searchForm!: FormGroup;
  hits!: any[];
  page: number = 1;

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      keyWord: new FormControl(''),
    });
  }

  searchResouces(event: any) {
    this.isClicked = true;
    event.preventDefault();

    this.fetchData();
  }

  onScroll(): void {
    console.log('scrolling');

    this.resourcesService
      .getResources(this.searchForm.value.keyWord, ++this.page)
      .subscribe((data) => {
        this.hits.push(...data.hits);
        this.resourcesService.hits = this.hits;
      });
  }

  searchTag(event: any) {
    console.log(event);

    this.searchForm.controls['keyWord'].setValue(event);
    console.log(this.searchForm.value);

    // this.searchResouces(event);
    this.fetchData();
  }

  fetchData() {
    this.resourcesService
      .getResources(this.searchForm.value.keyWord, this.page)
      .subscribe({
        next: (data) => {
          this.hits = data.hits;
          this.resourcesService.hits = data.hits;
          console.log(this.hits);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
