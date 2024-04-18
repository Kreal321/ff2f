import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-numbers-select',
  templateUrl: './numbers-select.component.html',
  styleUrls: ['./numbers-select.component.css']
})
export class NumbersSelectComponent {
  @Input() nums: number[] | undefined;
  @Input() numSelected: number | undefined;
  @Output() numSelectedChange: EventEmitter<number> = new EventEmitter<number>();

  selectNumber(num: number) {
    this.numSelected = num;
    this.numSelectedChange.emit(num);
  }
}
