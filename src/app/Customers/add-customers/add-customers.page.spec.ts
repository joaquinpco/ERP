import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddCustomersPage } from './add-customers.page';

describe('AddCustomersPage', () => {
  let component: AddCustomersPage;
  let fixture: ComponentFixture<AddCustomersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCustomersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
