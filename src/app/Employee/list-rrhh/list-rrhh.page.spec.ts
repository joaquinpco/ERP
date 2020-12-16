import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListRRHHPage } from './list-rrhh.page';

describe('ListRRHHPage', () => {
  let component: ListRRHHPage;
  let fixture: ComponentFixture<ListRRHHPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRRHHPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListRRHHPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
