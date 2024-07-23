import { DeliveryStatus } from "./delivery.type";

interface DriverDTO {
  nome: string;
}

interface ClientDTO {
  nome: string;
  endereco: string;
  bairro: string;
  cidade: string;
}

export interface DeliveryDTO {
  id: string;
  documento: string;
  motorista: DriverDTO;
  cliente_origem: ClientDTO;
  cliente_destino: ClientDTO;
  status_entrega: DeliveryStatus;
}
