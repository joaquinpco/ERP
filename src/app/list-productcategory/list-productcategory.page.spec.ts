import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListProductcategoryPage } from './list-productcategory.page';

describe('ListProductcategoryPage', () => {
  let component: ListProductcategoryPage;
  let fixture: ComponentFixture<ListProductcategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductcategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListProductcategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
