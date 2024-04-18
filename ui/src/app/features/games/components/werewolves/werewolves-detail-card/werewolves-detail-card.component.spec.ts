import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WerewolvesDetailCardComponent } from './werewolves-detail-card.component';

describe('WerewolvesDetailCardComponent', () => {
  let component: WerewolvesDetailCardComponent;
  let fixture: ComponentFixture<WerewolvesDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WerewolvesDetailCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WerewolvesDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
