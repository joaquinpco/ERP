import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBankaccountPage } from './add-bankaccount.page';

describe('AddBankaccountPage', () => {
  let component: AddBankaccountPage;
  let fixture: ComponentFixture<AddBankaccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBankaccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBankaccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
