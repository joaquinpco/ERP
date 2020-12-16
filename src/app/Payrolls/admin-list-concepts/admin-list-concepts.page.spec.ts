import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminListConceptsPage } from './admin-list-concepts.page';

describe('AdminListConceptsPage', () => {
  let component: AdminListConceptsPage;
  let fixture: ComponentFixture<AdminListConceptsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListConceptsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminListConceptsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
