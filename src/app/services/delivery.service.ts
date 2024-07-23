import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeliveryDTO } from '../models/delivery-dto.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private baseURL = environment.deliveryApi;

  constructor(private httpClient: HttpClient) { }

  get(query = '') {
    const url = query ? `${this.baseURL}?${query}` : this.baseURL;
    return this.httpClient.get<DeliveryDTO[]>(url)
  }
}
