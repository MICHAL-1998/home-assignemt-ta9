import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'items-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.less',
})
export class ItemsListComponent implements OnInit {
  constructor(public itemsService: ItemsService) {}

  ngOnInit(): void {
    this.itemsService.getItems();
  }
}
