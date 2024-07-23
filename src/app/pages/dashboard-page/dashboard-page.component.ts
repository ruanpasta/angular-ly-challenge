import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import DeliveryFactory from '../../factories/delivery.factory';
import { DeliveryService } from '../../services/delivery.service';
import {
  AgentDelivery,
  Delivery,
} from '../../models/delivery.type';
import { TableModule } from 'primeng/table';
import { DeliveryDTO } from '../../models/delivery-dto.type';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DeliveryTableComponent } from '../../components/delivery-table/delivery-table.component';
import { MessagesModule } from 'primeng/messages';
import { DeliveryStore } from '../../stores/delivery.store';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [ButtonModule, TableModule, ProgressSpinnerModule, DeliveryTableComponent, MessagesModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit {
  driverSuccessDeliveries: AgentDelivery[] = [];
  driverFailedDeliveries: AgentDelivery[] = [];
  neighborhoodDeliveries: AgentDelivery[] = [];
  deliveries: Delivery[] = [];
  loading = false;

  constructor(
    private deliveryService: DeliveryService,
    private deliveryStore: DeliveryStore,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getDeliveries();
  }

  private getDeliveries() {
    this.deliveries = this.deliveryStore.getDeliveries() || [];
    if (this.deliveries?.length) return this.updateDeliveries(this.deliveries, true);
    this.loading = true;
    this.deliveryService.get().pipe(finalize(() => (this.loading = false))).subscribe({
      next: (value) => this.updateDeliveries(value),
      error: () =>
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao buscar as entregas.' })
    });
  }

  private updateDeliveries(
    value: DeliveryDTO[] | Delivery[],
    alreadyConverted = false
  ) {
    if (!alreadyConverted)
      this.deliveries = new DeliveryFactory().convertMultiples<Delivery[]>(value);
    this.deliveryStore.setDeliveries(this.deliveries);

    this.driverSuccessDeliveries = this.getAgentDeliveries(
      this.deliveries,
      'driver.name'
    );
    this.driverFailedDeliveries = this.getAgentDeliveries(
      this.deliveries,
      'driver.name'
    );
    this.neighborhoodDeliveries = this.getAgentDeliveries(
      this.deliveries,
      'destinationClient.neighborhood'
    );
  }

  // We can implement this filter directly in the API if necessary to achieve real pagination when handling large datasets.
  private getAgentDeliveries(deliveries: Delivery[], agentComparator: any) {
    const filteredDeliveries = deliveries.reduce<AgentDelivery[]>(
      (accumulator, current: any): AgentDelivery[] => {
        const existingAgent = accumulator.find(
          (delivery: AgentDelivery) =>
            delivery.agentName ===
            this.getNestedProperty(current, agentComparator)
        );
        if (existingAgent) {
          existingAgent.successDeliveryAmount +=
            current.deliveryStatus === 'ENTREGUE' ? 1 : 0;
          existingAgent.deliveryAmount += 1;
          existingAgent.failedDeliveryAmount +=
            current.deliveryStatus === 'INSUCESSO' ? 1 : 0;
        }
        if (!existingAgent)
          accumulator.push({
            id: current.id,
            agentName: this.getNestedProperty(current, agentComparator),
            deliveryAmount: 1,
            successDeliveryAmount:
              current.deliveryStatus === 'ENTREGUE' ? 1 : 0,
            failedDeliveryAmount:
              current.deliveryStatus === 'INSUCESSO' ? 1 : 0,
          });

        return accumulator;
      },
      []
    ) as AgentDelivery[];

    return filteredDeliveries;
  }

  getNestedProperty(obj: any, key: string): any {
    return key
      .split('.')
      .reduce(
        (currentObject, currentKey) =>
          currentObject ? currentObject[currentKey] : undefined,
        obj
      );
  }
}
