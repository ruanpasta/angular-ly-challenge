import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Delivery } from '../models/delivery.type';

@Injectable({
  providedIn: 'root',
})
export class DeliveryStore {
  private deliveriesSubject: BehaviorSubject<Delivery[] | []> =
    new BehaviorSubject<Delivery[] | []>([]);

  deliveries$: Observable<Delivery[] | []> =
    this.deliveriesSubject.asObservable();

  setDeliveries(details: Delivery[]): void {
    this.deliveriesSubject.next(details);
  }

  getDeliveries(): Delivery[] | null {
    return this.deliveriesSubject.getValue();
  }
}
