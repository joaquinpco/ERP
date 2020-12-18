import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddRawmaterialsPage } from './add-rawmaterials.page';

describe('AddRawmaterialsPage', () => {
  let component: AddRawmaterialsPage;
  let fixture: ComponentFixture<AddRawmaterialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRawmaterialsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRawmaterialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
