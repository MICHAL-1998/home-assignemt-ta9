import { Component, ChangeDetectionStrategy } from '@angular/core';
import { inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Signal } from '@angular/core';
import { ItemsStore } from '../../store/items.store';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { ColorBlockModule } from 'ngx-color/block';

@Component({
  selector: 'add-item-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ColorBlockModule],
  templateUrl: './add-item-form.component.html',
  styleUrl: './add-item-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddItemFormComponent {
  private fb = inject(FormBuilder);
  public store = inject(ItemsStore);
  title: string = 'Create new';

  itemForm: FormGroup = this.fb.group({
    id: [null],
    name: ['', Validators.required],
    description: [''],
  });

  colorPalette = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

  onColorChange(event: any) {
    console.log('Color selected:', event.color.hex);
  }

  submitForm() {
    if (this.itemForm.valid) {
      let item = this.itemForm.value;

      if (!item.id) {
        item = { ...item, id: uuidv4() };
      }

      item.id ? this.store.updateItem(item) : this.store.addItem(item);
      this.itemForm.reset();
      this.store.closeForm();
    }
  }

  closeForm() {
    this.store.closeForm();
  }
}
