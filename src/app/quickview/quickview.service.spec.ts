import { TestBed, inject } from '@angular/core/testing';
import { QuickviewService } from './quickview.service';

describe('QuickviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuickviewService]
    });
  });

  it('should ...', inject([QuickviewService], (service: QuickviewService) => {
    expect(service).toBeTruthy();
  }));
});
