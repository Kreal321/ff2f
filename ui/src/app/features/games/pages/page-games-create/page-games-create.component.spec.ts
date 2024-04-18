import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGamesCreateComponent } from './page-games-create.component';

describe('PageGamesCreateComponent', () => {
  let component: PageGamesCreateComponent;
  let fixture: ComponentFixture<PageGamesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageGamesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGamesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
