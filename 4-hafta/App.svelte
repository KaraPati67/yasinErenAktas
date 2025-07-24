import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Angular ngFor ve ngIf Örneği</h1>
    <button (click)="addItem()">Yeni Eleman Ekle</button>
    <ul>
      <li *ngFor="let item of items; let i = index">
        {{ item }}
        <button (click)="removeItem(i)">Sil</button>
      </li>
    </ul>
    <p *ngIf="items.length === 0">Liste boş!</p>
  `
})
export class AppComponent {
  items: string[] = [];

  addItem() {
    this.items.push('Eleman ' + (this.items.length + 1));
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }
}