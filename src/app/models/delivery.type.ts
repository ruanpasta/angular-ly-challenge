interface Driver {
  name: string;
}

interface Client {
  name: string;
  address: string;
  neighborhood: string;
  city: string;
}

export type DeliveryStatus = 'ENTREGUE' | 'PENDENTE' | 'INSUCESSO'

export interface Delivery {
  id: string;
  document: string;
  driver: Driver;
  originClient: Client;
  destinationClient: Client;
  deliveryStatus: DeliveryStatus;
}

export type AgentDelivery = {
  id: string;
  agentName: string;
  successDeliveryAmount: number;
  deliveryAmount: number;
  failedDeliveryAmount: number;
}

export interface DeliverySuccessDashboard {
  id: string;
  driverName: string;
  successDeliveryAmount: number;
  deliveryAmount: number;
}

export interface DeliveryFailedDashboard {
  id: string;
  driverName: string;
  failedDeliveryAmount: number;
}

export interface NeighborhoodDashboard {
  id: string;
  neighborhood: string;
  successDeliveryAmount: number;
  deliveryAmount: number;
}
