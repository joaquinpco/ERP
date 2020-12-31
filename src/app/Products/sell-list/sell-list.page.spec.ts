import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SellListPage } from './sell-list.page';

describe('SellListPage', () => {
  let component: SellListPage;
  let fixture: ComponentFixture<SellListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SellListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
