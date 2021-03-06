import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef, } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { 
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        MatListModule,
        MatDialogModule
      } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MarkerItemComponent } from './marker-item/marker-item.component';
import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MarkerItemDialogComponent } from './MarkerItemDialog/MarkerItemDialog.component';
import { DataService } from './data.service';


const appRoutes: Routes =[
  { path: '', component: HomePageComponent},
  { path: 'marker/:id', component: MarkerItemComponent},
  //{ path: '**', redirectTo: '/'}
  //{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
    apiKey: 'AIzaSyBeY3j4aqSh_fELBy61-XFMHCHAuMNMczQ'
    }),
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    NgxMaterialTimepickerModule.forRoot(),
    MatFormFieldModule,
    MatSelectModule, 
    MatOptionModule,
    MatInputModule,
    MatListModule,
    MatDialogModule
    
  ],
  entryComponents: [
    MarkerItemDialogComponent
  ],
  providers: [
    DataService
  ],
  declarations: [ 
    AppComponent,
    HomePageComponent,
    MarkerItemComponent,
    MarkerItemDialogComponent
],
  bootstrap: [ AppComponent ]
})
export class AppModule {}