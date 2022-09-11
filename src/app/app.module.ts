import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ImageItemComponent } from './components/image-item/image-item.component';
import { ExampleComponent } from './example/example.component';
import { DialogModule } from './dialog/dialog.module';
import { ShowImageComponent } from './components/show-image/show-image.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SrollTopComponent } from './components/sroll-top/sroll-top.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    ImageItemComponent,
    ExampleComponent,
    ShowImageComponent,
    SrollTopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
    InfiniteScrollModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
