import { TestBed } from '@angular/core/testing';

import { MyLib2Service } from './my-lib2.service';

describe('MyLib2Service', () => {
  let service: MyLib2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyLib2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
