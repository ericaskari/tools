import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list-item-panel',
  templateUrl: './list-item-panel.component.html',
  styleUrls: ['./list-item-panel.component.scss']
})
export class ListItemPanelComponent implements OnInit {
  @Input() showEdit: boolean = false;
  @Input() showClose: boolean = false;
  @Input() showSave: boolean = false;
  @Input() showAdd: boolean = false;
  @Output() editClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() addClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
