import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLib1Component } from './my-lib1.component';

describe('MyLib1Component', () => {
  let component: MyLib1Component;
  let fixture: ComponentFixture<MyLib1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyLib1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyLib1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
