import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindFriendsDetailCardComponent } from './find-friends-detail-card.component';

describe('FindFriendsDetailCardComponent', () => {
  let component: FindFriendsDetailCardComponent;
  let fixture: ComponentFixture<FindFriendsDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindFriendsDetailCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindFriendsDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
