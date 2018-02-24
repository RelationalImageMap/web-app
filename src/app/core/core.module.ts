import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { MapDataService } from './map-data.service';

@NgModule({
  imports: [ CommonModule ],
  declarations: [],
  providers: [ AuthService, MapDataService ]
})
export class CoreModule { }
