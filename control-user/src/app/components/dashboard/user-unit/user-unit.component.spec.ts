import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUnitComponent } from './user-unit.component';

describe('UserUnitComponent', () => {
  let component: UserUnitComponent;
  let fixture: ComponentFixture<UserUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
