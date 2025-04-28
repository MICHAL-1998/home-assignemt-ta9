import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationHandlingComponent } from './pagination-handling.component';

describe('PaginationHandlingComponent', () => {
  let component: PaginationHandlingComponent;
  let fixture: ComponentFixture<PaginationHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationHandlingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
