import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditRawmaterialPage } from './edit-rawmaterial.page';

describe('EditRawmaterialPage', () => {
  let component: EditRawmaterialPage;
  let fixture: ComponentFixture<EditRawmaterialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRawmaterialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditRawmaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
