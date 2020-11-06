import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditRrhhPage } from './edit-rrhh.page';

describe('EditRrhhPage', () => {
  let component: EditRrhhPage;
  let fixture: ComponentFixture<EditRrhhPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRrhhPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditRrhhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
