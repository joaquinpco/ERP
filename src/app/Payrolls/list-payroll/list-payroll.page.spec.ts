import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListPayrollPage } from './list-payroll.page';

describe('ListPayrollPage', () => {
  let component: ListPayrollPage;
  let fixture: ComponentFixture<ListPayrollPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPayrollPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListPayrollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
