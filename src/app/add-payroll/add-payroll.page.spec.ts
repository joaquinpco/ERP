import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPayrollPage } from './add-payroll.page';

describe('AddPayrollPage', () => {
  let component: AddPayrollPage;
  let fixture: ComponentFixture<AddPayrollPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPayrollPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPayrollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
