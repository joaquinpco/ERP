import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPurchasingPage } from './add-purchasing.page';

describe('AddPurchasingPage', () => {
  let component: AddPurchasingPage;
  let fixture: ComponentFixture<AddPurchasingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPurchasingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPurchasingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
