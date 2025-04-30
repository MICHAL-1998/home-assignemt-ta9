import { Component, ChangeDetectionStrategy, Input, inject, Output, EventEmitter } from '@angular/core';
import { Item } from '../../services/items.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'item-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-info.component.html',
  styleUrl: './item-info.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemInfoComponent {
  @Input() item!: Item;
  @Output() edit = new EventEmitter<Item>();

  updateItem(){
    this.edit.emit(this.item);
  }
}
