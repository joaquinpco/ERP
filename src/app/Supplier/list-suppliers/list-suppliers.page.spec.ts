import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListSuppliersPage } from './list-suppliers.page';

describe('ListSuppliersPage', () => {
  let component: ListSuppliersPage;
  let fixture: ComponentFixture<ListSuppliersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSuppliersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListSuppliersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
