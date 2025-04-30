import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  AfterViewInit,
} from '@angular/core';
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
import { CommonModule, formatDate } from '@angular/common';
import { ColorSketchModule } from 'ngx-color/sketch';
import { log } from 'console';
import { create } from 'domain';

@Component({
  selector: 'add-item-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ColorSketchModule],
  templateUrl: './add-item-form.component.html',
  styleUrl: './add-item-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddItemFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  public store = inject(ItemsStore);
  title: string = '';

  itemForm: FormGroup = this.fb.group({
    id: [null],
    name: ['', Validators.required],
    description: [''],
    color: ['#000000'],
  });

  color!: string;
  showPicker = false;
  //colorControl = this.itemForm.get('color');
  get colorControl() {
    return this.itemForm.get('color');
  }
  ngOnInit() {
    const item = this.store.currentItem();
    if (item) {
      this.title = 'Update item';
      this.itemForm.patchValue({
        name: item.name,
        description: item.description,
        color: item.color || '#000000',
      });
    } else {
      this.title = 'Create new';
      this.itemForm.setValue({
        id: null,
        name: '',
        description: '',
        color: '#000000',
      });
    }
  }

  isInvalid(field: string): boolean {
    const ctrl = this.itemForm.get(field);
    return !!ctrl && ctrl.invalid && ctrl.touched;
  }

  togglePicker() {
    this.showPicker = !this.showPicker;
  }

  onColorChange(event: any) {
    if (event?.color?.hex) {
      const selectedColor = event.color.hex;
      this.colorControl?.setValue(selectedColor);
      this.colorControl?.markAsDirty();
      this.colorControl?.markAsTouched();
      this.showPicker = false;
    }
  }

  submitForm() {
    if (this.itemForm.valid) {
      let item = this.itemForm.value;
      const current = this.store.currentItem();

      const isUpdate = !!current;
      const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');

      if (!isUpdate) {
        item = { ...item, id: uuidv4() };
        this.store.addItem({ ...item, createdDate: today, lastUpdated: today });
      } else {
        item = { ...item, id: current.id }; // שמירת אותו ID
        this.store.updateItem({
          ...item,
          createdDate: current.createdDate,
          lastUpdated: today,
        });
      }

      this.resetFormToEmpty();
      this.store.closeForm();
    }
  }

  resetFormToEmpty() {
    this.itemForm.reset();
    this.itemForm.patchValue({ color: '#000000' });
    //this.color = '#000000';
  }

  closeForm() {
    this.store.closeForm();
  }
}
