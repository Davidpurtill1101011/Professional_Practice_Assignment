import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides/slides.component';
import { StartComponent } from './start/start.component';



@NgModule({
  declarations: [SlidesComponent, StartComponent],
  exports: [SlidesComponent, StartComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
