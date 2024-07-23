import { TestBed } from '@angular/core/testing';
import { FilteredDeliveryStore } from './filtered-delivery.store';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';


describe('DeliveryService', () => {
  let service: FilteredDeliveryStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FilteredDeliveryStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
