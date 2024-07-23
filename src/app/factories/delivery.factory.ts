import { DeliveryDTO } from '../models/delivery-dto.type';
import { Delivery } from '../models/delivery.type';

export default class DeliveryFactory {
  convert<T extends DeliveryDTO | Delivery>(
    dto: DeliveryDTO | Delivery
  ): T {
    const isDelivery = 'driver' in dto;
    if (isDelivery) return this.toPortuguese(dto as Delivery) as T;
    return this.toEnglish(dto as DeliveryDTO) as T;
  }

  convertMultiples<T extends DeliveryDTO[] | Delivery[]>(
    dtos: DeliveryDTO[] | Delivery[]
  ): T {
    const isDeliveries = dtos.every((dto) => 'driver' in dto);
    if (isDeliveries)
      return dtos.map((dto) =>
        this.toPortuguese(dto as unknown as Delivery)
      ) as T;

    return dtos.map((dto) =>
      this.toEnglish(dto as unknown as DeliveryDTO)
    ) as T;
  }

  private toEnglish(dto: DeliveryDTO): Delivery {
    return {
      id: dto.id,
      document: dto.documento,
      driver: {
        name: dto.motorista.nome,
      },
      originClient: {
        name: dto.cliente_origem.nome,
        address: dto.cliente_origem.endereco,
        neighborhood: dto.cliente_origem.bairro,
        city: dto.cliente_origem.cidade,
      },
      destinationClient: {
        name: dto.cliente_destino.nome,
        address: dto.cliente_destino.endereco,
        neighborhood: dto.cliente_destino.bairro,
        city: dto.cliente_destino.cidade,
      },
      deliveryStatus: dto.status_entrega,
    };
  }

  private toPortuguese(dto: Delivery): DeliveryDTO {
    return {
      id: dto.id,
      documento: dto.document,
      motorista: {
        nome: dto.driver.name,
      },
      cliente_origem: {
        nome: dto.originClient.name,
        endereco: dto.originClient.address,
        bairro: dto.originClient.neighborhood,
        cidade: dto.originClient.city,
      },
      cliente_destino: {
        nome: dto.destinationClient.name,
        endereco: dto.destinationClient.address,
        bairro: dto.destinationClient.neighborhood,
        cidade: dto.destinationClient.city,
      },
      status_entrega: dto.deliveryStatus,
    };
  }
}
