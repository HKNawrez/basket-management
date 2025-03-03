import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
//This commented code is to test standalone pipe
//bootstrapApplication(TestPipeComponent)
 // .catch(err => console.error(err));
