import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCustomersPage } from './edit-customers.page';

describe('EditCustomersPage', () => {
  let component: EditCustomersPage;
  let fixture: ComponentFixture<EditCustomersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCustomersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCustomersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
