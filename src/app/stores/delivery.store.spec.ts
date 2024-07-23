import { TestBed } from '@angular/core/testing';
import { DeliveryStore } from './delivery.store';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DeliveryService } from '../services/delivery.service';

describe('DeliveryService', () => {
  let service: DeliveryStore;
  const httpTesting = TestBed.inject(HttpTestingController);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), DeliveryService],
    });
    service = TestBed.inject(DeliveryStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
