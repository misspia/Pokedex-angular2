import { TestBed, inject } from '@angular/core/testing';
import { MainListService } from './main-list.service';

describe('MainListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainListService]
    });
  });

  it('should ...', inject([MainListService], (service: MainListService) => {
    expect(service).toBeTruthy();
  }));
});
