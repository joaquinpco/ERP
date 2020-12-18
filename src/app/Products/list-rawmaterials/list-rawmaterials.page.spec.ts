import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListRawmaterialsPage } from './list-rawmaterials.page';

describe('ListRawmaterialsPage', () => {
  let component: ListRawmaterialsPage;
  let fixture: ComponentFixture<ListRawmaterialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRawmaterialsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListRawmaterialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
