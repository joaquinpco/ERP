import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DelteRrhhPage } from './delte-rrhh.page';

describe('DelteRrhhPage', () => {
  let component: DelteRrhhPage;
  let fixture: ComponentFixture<DelteRrhhPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelteRrhhPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DelteRrhhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
