import { HttpClient } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';

export interface Item {
  id: number;
  name: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ItemsService {
  allItems = signal<Item[]>([]);

  constructor(private readonly httpClient: HttpClient) {}

  getItems(): void {
    this.httpClient
      .get<Item[]>('assets/items-data.json')
      .subscribe((items) => this.allItems.set(items));
  }
}
