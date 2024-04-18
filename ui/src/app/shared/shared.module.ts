import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumbersSelectComponent } from './components/numbers-select/numbers-select.component';
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";
import { TextsSelectComponent } from './components/texts-select/texts-select.component';



@NgModule({
  declarations: [
    NumbersSelectComponent,
    TextsSelectComponent
  ],
  imports: [
    CommonModule,
    MdbRippleModule
  ],
    exports: [
        NumbersSelectComponent,
        TextsSelectComponent
    ]
})
export class SharedModule { }
