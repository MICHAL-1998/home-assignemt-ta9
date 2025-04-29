import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  Signal,
} from '@angular/core';
import { Item, ItemsService } from '../../services/items.service';
import { ItemsStore } from '../../store/items.store';
import { AddItemFormComponent } from '../add-item-form/add-item-form.component';
import { ItemInfoComponent } from '../item-info/item-info.component';

@Component({
  selector: 'items-list',
  standalone: true,
  imports: [CommonModule, AddItemFormComponent, ItemInfoComponent],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsListComponent implements OnInit {
  constructor(public itemsService: ItemsService) {}

  public store = inject(ItemsStore);
  allItems: Signal<Item[]> = this.store.items;

  ngOnInit(): void {
    //this.itemsService.getItems();
    //this.store.items
  }

  addItem() {
    this.store.openForm();
  }
}
