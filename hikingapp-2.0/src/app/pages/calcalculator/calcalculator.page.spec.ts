import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalcalculatorPage } from './calcalculator.page';

describe('CalcalculatorPage', () => {
  let component: CalcalculatorPage;
  let fixture: ComponentFixture<CalcalculatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcalculatorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalcalculatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
