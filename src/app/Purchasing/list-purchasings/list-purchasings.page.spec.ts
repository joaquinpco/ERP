import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListPurchasingsPage } from './list-purchasings.page';

describe('ListPurchasingsPage', () => {
  let component: ListPurchasingsPage;
  let fixture: ComponentFixture<ListPurchasingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPurchasingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListPurchasingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
