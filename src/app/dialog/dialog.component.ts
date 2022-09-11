import {
  Component,
  Type,
  OnDestroy,
  AfterViewInit,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { InsertionDirective } from './insertion.directive';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  private readonly _onClose = new Subject<any>();

  public componentRef: ComponentRef<any> | undefined;
  public childComponentType!: Type<any>;
  public onClose = this._onClose.asObservable();

  // add this:
  @ViewChild(InsertionDirective)
  insertionPoint!: InsertionDirective;

  // and this:
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent) {
    // close the dialog
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    let componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(componentType);

    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }
  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
