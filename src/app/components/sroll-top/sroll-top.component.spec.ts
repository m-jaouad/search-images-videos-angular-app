import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrollTopComponent } from './sroll-top.component';

describe('SrollTopComponent', () => {
  let component: SrollTopComponent;
  let fixture: ComponentFixture<SrollTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrollTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrollTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
