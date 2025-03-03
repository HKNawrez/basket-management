export interface Product {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  isImported: boolean;
  category: string;
  selectedQuantity: number; // Ajout de la propriété selectedQuantity
}
