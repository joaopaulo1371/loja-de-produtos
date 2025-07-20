import { Component, OnInit } from '@angular/core';
import { OrderItem, OrderResponse, Product, ProductService } from '../../services/product';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule], // Importa diretivas como *ngFor e *ngIf
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart: { product: Product; quantity: number }[] = [];
  errorMessage: string = '';
  orderMessage: string = '';
  uniqueCategories: string[] = [];
  uniqueBrands: string[] = [];
  searchTerm: string = '';
  selectedCategory: string = ''; // Armazena a categoria selecionada
  selectedBrand: string = ''; // Armazena a marca selecionada
  showSuccessPopup: boolean = false; // Estado para pop-up de sucesso
  showErrorPopup: boolean = false; // Estado para pop-up de erro

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = [...products]; // Inicializa com todos os produtos
        this.updateUniqueFilters();
      },
      error: (err) => (this.errorMessage = err.message),
    });
    console.log(this.products);
  }

  // Atualiza as listas únicas de categorias e marcas
  updateUniqueFilters() {
    this.uniqueCategories = [...new Set(this.products.map((p) => p.category))];
    this.uniqueBrands = [...new Set(this.products.map((p) => p.brand))];
  }

  // Atualiza a categoria selecionada
  updateCategory(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedCategory = select.value;
  }

  // Atualiza a marca selecionada
  updateBrand(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedBrand = select.value;
  }

  // Filtra por pesquisa
  searchProducts(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.trim().toLowerCase();
    this.applyFilters(); // Aplica os filtros imediatamente para a pesquisa
  }

  // Aplica todos os filtros
  applyFilters() {
    this.filteredProducts = [...this.products]; // Reseta a base

    // Aplica filtro de categoria
    if (this.selectedCategory) {
      this.filteredProducts = this.filteredProducts.filter((p) => p.category === this.selectedCategory);
    }

    // Aplica filtro de marca
    if (this.selectedBrand) {
      this.filteredProducts = this.filteredProducts.filter((p) => p.brand === this.selectedBrand);
    }

    // Aplica filtro de pesquisa
    if (this.searchTerm) {
      this.filteredProducts = this.filteredProducts.filter((p) =>
        p.name.toLowerCase().includes(this.searchTerm) ||
        p.description.toLowerCase().includes(this.searchTerm)
      );
    }
  }

  addToCart(product: Product) {
    const existing = this.cart.find((item) => item.product.product_id === product.product_id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
  }

  removeFromCart(product: Product) {
    this.cart = this.cart.filter((item) => item.product.product_id !== product.product_id);
  }

  submitOrder() {
    const items: OrderItem[] = this.cart.map((item) => ({
      product_id: item.product.product_id,
      quantity: item.quantity,
    }));
    this.productService.createOrder(items).subscribe({
      next: (response: OrderResponse) => {
        this.orderMessage = response.message;
        this.cart = []; // Limpa o carrinho
        this.showSuccessPopup = true; // Exibe pop-up de sucesso
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.showErrorPopup = true; // Exibe pop-up de erro
      },
    });
  }

  // Fecha o pop-up correspondente
  closePopup(type: string) {
    if (type === 'success') {
      this.showSuccessPopup = false;
    } else if (type === 'error') {
      this.showErrorPopup = false;
      this.errorMessage = ''; // Limpa a mensagem de erro ao fechar
    }
  }

  // Getter para exibir produtos filtrados no template
  get displayedProducts(): Product[] {
    return this.filteredProducts;
  }
}