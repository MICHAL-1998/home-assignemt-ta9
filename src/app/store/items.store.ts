import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Item, ItemsService } from '../services/items.service';
import { computed, effect, inject } from '@angular/core';

export interface ItemsState {
  items: Item[];
  searchWord: string;
  currentPage: number;
  pageSize: number;
  isFormOpen: boolean;
  currentItem: Item | null;
}

const initialState: ItemsState = {
  items: [],
  searchWord: '',
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

    effect(() => {
      const initialItems = itemsService.allItems();
      if (store.items().length === 0 && initialItems.length > 0) {
        patchState(store, { items: initialItems });
      }
    });
    return {
      items: computed(() => store.items()),

      itemsFiltered: computed(() =>
        store
          .items()
          .filter((item) =>
            item.description
              .toLowerCase()
              .includes(store.searchWord().toLowerCase())
          )
      ),

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
      setSearchWord(searchWord: string) {
        patchState(store, { searchWord });
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
