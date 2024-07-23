import { Component, OnInit } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { Delivery } from '../../models/delivery.type';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { debounceTime, finalize, Subject, switchMap, tap } from 'rxjs';
import { DeliveryService } from '../../services/delivery.service';
import { DeliveryDTO } from '../../models/delivery-dto.type';
import DeliveryFactory from '../../factories/delivery.factory';
import { InputTextModule } from 'primeng/inputtext';
import { FilteredDeliveryStore } from '../../stores/filtered-delivery.store';

@Component({
  selector: 'app-delivery-page',
  standalone: true,
  imports: [
    TableModule,
    IconFieldModule,
    InputIconModule,
    DropdownModule,
    InputTextModule,
    TagModule,
    FormsModule,
    NgClass,
  ],
  templateUrl: './delivery-page.component.html',
  styleUrl: './delivery-page.component.scss',
})
export class DeliveryPageComponent implements OnInit {
  loading = false;
  deliveries: Delivery[] = [];
  statuses: { label: string; value: string }[] = [];
  selectedStatus!: string | undefined;
  searchName!: string | undefined;
  deliveriesSubject = new Subject<string>();
  rows = 10;
  first = 0;

  constructor(
    private deliveryService: DeliveryService,
    private filteredDeliveryStore: FilteredDeliveryStore
  ) {}

  ngOnInit(): void {
    this.startState();
    this.configureDeliverySubject();
    this.getDeliveries();
  }

  getDeliveries() {
    this.deliveries = this.filteredDeliveryStore.getDeliveries() || [];
    if (this.deliveries?.length)
      return this.updateDeliveries(this.deliveries, true);
    this.deliveriesSubject.next('');
  }

  filter() {
    const nameQuery = this.searchName
      ? `motorista.nome=${this.searchName}`
      : '';
    const statusQuery = this.selectedStatus
      ? `status_entrega=${this.selectedStatus}`
      : '';
    const query: string[] = [];
    if (nameQuery) query.push(nameQuery);
    if (statusQuery) query.push(statusQuery);

    this.deliveriesSubject.next(query.join('&'));
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSUCESSO':
        return 'danger';
      case 'ENTREGUE':
        return 'success';
      case 'PENDENTE':
        return 'warning';
      default:
        return 'info';
    }
  }

  private startState() {
    this.statuses = [
      { label: 'Entregue', value: 'ENTREGUE' },
      { label: 'Pendente', value: 'PENDENTE' },
      { label: 'Insucesso', value: 'INSUCESSO' },
    ];
  }

  private configureDeliverySubject() {
    const halfSecond = 500;
    this.deliveriesSubject
      .pipe(
        debounceTime(halfSecond),
        switchMap((query) => {
          this.loading = true;
          return this.deliveryService
            .get(query)
            .pipe(finalize(() => (this.loading = false)));
        })
      )
      .subscribe({
        next: (deliveries) => this.updateDeliveries(deliveries),
      });
  }

  private updateDeliveries(
    value: DeliveryDTO[] | Delivery[],
    alreadyConverted = false
  ) {
    if (!alreadyConverted)
      this.deliveries = new DeliveryFactory().convertMultiples<Delivery[]>(
        value
      );
    this.filteredDeliveryStore.setDeliveries(this.deliveries);
  }
}
