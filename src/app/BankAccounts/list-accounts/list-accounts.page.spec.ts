import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListAccountsPage } from './list-accounts.page';

describe('ListAccountsPage', () => {
  let component: ListAccountsPage;
  let fixture: ComponentFixture<ListAccountsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAccountsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListAccountsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
