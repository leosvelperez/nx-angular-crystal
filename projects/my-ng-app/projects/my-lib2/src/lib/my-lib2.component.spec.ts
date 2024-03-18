import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLib2Component } from './my-lib2.component';

describe('MyLib2Component', () => {
  let component: MyLib2Component;
  let fixture: ComponentFixture<MyLib2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyLib2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyLib2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
