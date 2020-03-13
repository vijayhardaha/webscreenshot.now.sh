import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './parts/header/header.component';
import { FooterComponent } from './parts/footer/footer.component';
import { AboutComponent } from './parts/about/about.component';
import { ExamplesComponent } from './parts/examples/examples.component';
import { ImageBoxComponent } from './parts/examples/image-box.component';
import { RadioInputComponent } from './parts/header/radio-input.component';
import { NotyService } from './parts/header/noty.service';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		AboutComponent,
		ExamplesComponent,
		ImageBoxComponent,
		RadioInputComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	providers: [NotyService],
	bootstrap: [AppComponent]
})
export class AppModule { }
