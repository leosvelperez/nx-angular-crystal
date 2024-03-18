import { TestBed } from '@angular/core/testing';

import { MyLib1Service } from './my-lib1.service';

describe('MyLib1Service', () => {
  let service: MyLib1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyLib1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
