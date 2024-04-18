import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUserLoginComponent } from './page-user-login.component';

describe('PageUserLoginComponent', () => {
  let component: PageUserLoginComponent;
  let fixture: ComponentFixture<PageUserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageUserLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
