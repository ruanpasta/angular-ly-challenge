import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-delivery-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './delivery-table.component.html',
  styleUrl: './delivery-table.component.scss'
})
export class DeliveryTableComponent {
  @Input() value: any[] = [];
  @Input() columns: string[] = [];
  @Input() keys: string[] = [];
  @Input() id = '';

  getId(value: string) {
    return `${this.id}-${value}`;
  }
}
