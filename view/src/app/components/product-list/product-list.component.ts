import { Component, OnInit } from '@angular/core';
import { OrderItem, OrderResponse, Product, ProductService } from '../../services/product';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule], 
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
  selectedCategory: string = ''; 
  selectedBrand: string = ''; 
  showSuccessPopup: boolean = false; 
  showErrorPopup: boolean = false; 

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = [...products]; 
        this.updateUniqueFilters();
      },
      error: (err) => (this.errorMessage = err.message),
    });
    console.log(this.products);
  }

  updateUniqueFilters() {
    this.uniqueCategories = [...new Set(this.products.map((p) => p.category))];
    this.uniqueBrands = [...new Set(this.products.map((p) => p.brand))];
  }

  updateCategory(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedCategory = select.value;
  }

  updateBrand(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedBrand = select.value;
  }

  searchProducts(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.trim().toLowerCase();
    this.applyFilters(); 
  }

  applyFilters() {
    this.filteredProducts = [...this.products];

    if (this.selectedCategory) {
      this.filteredProducts = this.filteredProducts.filter((p) => p.category === this.selectedCategory);
    }

    if (this.selectedBrand) {
      this.filteredProducts = this.filteredProducts.filter((p) => p.brand === this.selectedBrand);
    }

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
        this.cart = []; 
        this.showSuccessPopup = true; 
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.showErrorPopup = true; 
      },
    });
  }

  closePopup(type: string) {
    if (type === 'success') {
      this.showSuccessPopup = false;
    } else if (type === 'error') {
      this.showErrorPopup = false;
      this.errorMessage = ''; 
    }
  }

  get displayedProducts(): Product[] {
    return this.filteredProducts;
  }
}