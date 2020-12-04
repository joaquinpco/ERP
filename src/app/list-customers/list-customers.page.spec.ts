import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListCustomersPage } from './list-customers.page';

describe('ListCustomersPage', () => {
  let component: ListCustomersPage;
  let fixture: ComponentFixture<ListCustomersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCustomersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCustomersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
