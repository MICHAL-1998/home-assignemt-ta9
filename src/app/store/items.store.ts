import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Item, ItemsService } from '../services/items.service';
import { inject } from '@angular/core';

export interface ItemsState {
  items: Item[];
  searchTerm: string;
  currentPage: number;
  pageSize: number;
  isFormOpen: boolean;
  currentItem: Item | null;
}

const initialState: ItemsState = {
  items: [],
  searchTerm: '',
  currentPage: 1,
  pageSize: 10,
  isFormOpen: false,
  currentItem: null,
};

export const ItemsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const itemsService = inject(ItemsService);
    // loadItems(items: Item[]) {
    //   patchState(store, { items });
    // },
    return {
      items: itemsService.allItems,
      addItem(item: Item) {
        patchState(store, { items: [...store.items(), item] });
      },
      updateItem(updatedItem: Item) {
        patchState(store, {
          items: store
            .items()
            .map((item) => (item.id === updatedItem.id ? updatedItem : item)),
        });
      },
      setSearchTerm(searchTerm: string) {
        patchState(store, { searchTerm });
      },
      setPage(page: number) {
        patchState(store, { currentPage: page });
      },
      setPageSize(pageSize: number) {
        patchState(store, { pageSize });
      },
      openForm(item?: Item) {
        patchState(store, { isFormOpen: true, currentItem: item || null });
      },
      closeForm() {
        patchState(store, { isFormOpen: false, currentItem: null });
      },
    };
  })
);
