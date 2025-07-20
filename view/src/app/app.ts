// src/app/app.ts
import { Component } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent], // Importa o ProductListComponent
  template: `<app-product-list></app-product-list>`, // Exibe a vitrine
})
export class App {}