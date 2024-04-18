import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WerewolvesDetailCreateCardComponent } from './werewolves-detail-create-card.component';

describe('WerewolvesDetailCreateCardComponent', () => {
  let component: WerewolvesDetailCreateCardComponent;
  let fixture: ComponentFixture<WerewolvesDetailCreateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WerewolvesDetailCreateCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WerewolvesDetailCreateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
