import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-texts-select',
  templateUrl: './texts-select.component.html',
  styleUrls: ['./texts-select.component.css']
})
export class TextsSelectComponent {
  @Input() texts: string[] | undefined;
  @Input() textSelected: string | undefined;
  @Output() textSelectedChange: EventEmitter<string> = new EventEmitter<string>();

  selectNumber(text: string) {
    this.textSelected = text;
    this.textSelectedChange.emit(text);
  }
}
