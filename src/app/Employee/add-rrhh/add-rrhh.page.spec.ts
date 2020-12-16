import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddRrhhPage } from './add-rrhh.page';

describe('AddRrhhPage', () => {
  let component: AddRrhhPage;
  let fixture: ComponentFixture<AddRrhhPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRrhhPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRrhhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
