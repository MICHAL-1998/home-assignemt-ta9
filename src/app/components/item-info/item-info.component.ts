import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Item } from '../../services/items.service';

@Component({
  selector: 'item-info',
  standalone: true,
  imports: [],
  templateUrl: './item-info.component.html',
  styleUrl: './item-info.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemInfoComponent {
  @Input() item!: Item;
}
