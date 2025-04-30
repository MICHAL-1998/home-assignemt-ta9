import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  Signal,
} from '@angular/core';
import { Item, ItemsService } from '../../services/items.service';
import { ItemsStore } from '../../store/items.store';
import { AddItemFormComponent } from '../add-item-form/add-item-form.component';
import { ItemInfoComponent } from '../item-info/item-info.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'items-list',
  standalone: true,
  imports: [CommonModule, AddItemFormComponent, ItemInfoComponent, FormsModule],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsListComponent {
  constructor(public itemsService: ItemsService) {}

  public store = inject(ItemsStore);
  items = this.store.itemsFiltered;
  search = '';


  addItem() {
    this.store.openForm();
  }

  updateItem(item: Item) {
    this.store.openForm(item);
  }

  onSearch(word: string) {
    this.store.setSearchWord(word);
  }
}
