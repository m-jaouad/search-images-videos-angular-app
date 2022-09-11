import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
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

  constructor(
    private resourcesService: ResourcesService,
    @Inject(DOCUMENT) private document: Document
  ) {}

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
    this.searchForm.controls['keyWord'].setValue(event);
    this.fetchData();
    console.log('value is :' + this.searchForm.value.keyWord);
    this.scrollToTop();
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

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }
}
