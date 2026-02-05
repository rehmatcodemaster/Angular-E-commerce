import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourOrders } from './your-orders';

describe('YourOrders', () => {
  let component: YourOrders;
  let fixture: ComponentFixture<YourOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
