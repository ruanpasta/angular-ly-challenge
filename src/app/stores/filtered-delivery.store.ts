import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Delivery } from '../models/delivery.type';

@Injectable({
  providedIn: 'root',
})
export class FilteredDeliveryStore {
  private filteredDeliverySubject: BehaviorSubject<Delivery[] | []> =
    new BehaviorSubject<Delivery[] | []>([]);

  filteredDeliveries$: Observable<Delivery[] | []> =
    this.filteredDeliverySubject.asObservable();

  setDeliveries(details: Delivery[]): void {
    this.filteredDeliverySubject.next(details);
  }

  getDeliveries(): Delivery[] | null {
    return this.filteredDeliverySubject.getValue();
  }
}
