import {Pipe, PipeTransform} from '@angular/core';
import {
  CATEGORY_BOOKS,
  CATEGORY_FOOD,
  CATEGORY_MEDICINE,
  IMPORT_DUTY,
  ROUNDING_FACTOR,
  TAX_RATE_BOOKS,
  TAX_RATE_FOOD_MEDICINE,
  TAX_RATE_OTHER
} from '../constants';

@Pipe({
  name: 'multiTransform',
  standalone: true
})
export class MultiTransformPipe implements PipeTransform {


  transform(value: any, method: string, ...args: any[]): any {
    let taxe=this.calculateTax(value,args[0],args[1]);

    switch (method) {
      case 'calculateTax':
        return taxe;
      case 'calculateHTPrice':
        return this.calculateHTPrice(value,taxe);
      default:
        return value;
    }
  }
  private  calculateTax(price: number, category: string, isImported: boolean): number {
      let taxRate = 0;

      // Déterminer la taxe de base en fonction de la catégorie
      if (category === CATEGORY_FOOD || category === CATEGORY_MEDICINE) {
        taxRate = TAX_RATE_FOOD_MEDICINE;
      } else if (category === CATEGORY_BOOKS) {
        taxRate = TAX_RATE_BOOKS;
      } else {
        taxRate = TAX_RATE_OTHER;
      }

      // Ajouter la taxe additionnelle pour les produits importés
      if (isImported) {
        taxRate += IMPORT_DUTY;
      }

      // Calculer la taxe totale
      const totalTax = price * taxRate / 100;
      // Arrondir la taxe aux 5 centimes supérieurs
      const roundedTax = Math.ceil(totalTax * ROUNDING_FACTOR) / ROUNDING_FACTOR;
      return roundedTax;
    }
  private  calculateHTPrice(price: number, taxe:number){
      return price+taxe;
    }
  }
