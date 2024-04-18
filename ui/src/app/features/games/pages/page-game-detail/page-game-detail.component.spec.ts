import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGameDetailComponent } from './page-game-detail.component';

describe('PageGameDetailComponent', () => {
  let component: PageGameDetailComponent;
  let fixture: ComponentFixture<PageGameDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageGameDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
