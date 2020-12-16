import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddReportPage } from './add-report.page';

describe('AddReportPage', () => {
  let component: AddReportPage;
  let fixture: ComponentFixture<AddReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
