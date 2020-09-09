import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { CommonService } from './common.service';
import { HeaderComponent } from './header/header.component';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    AgGridModule.withComponents([])
  ],
  exports: [HeaderComponent, AngularMaterialModule, AgGridModule],
  providers: [CommonService]
})
export class SharedModule { }
