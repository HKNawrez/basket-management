import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultiTransformPipe} from './multiTransform.pipe';

@Component({
  selector: 'app-test-pipe',
  standalone: true,
  imports: [CommonModule, MultiTransformPipe, MultiTransformPipe],
  template: `
    <div>
      <p>Original Price: {{ price }}</p>
      <p>Category: {{ category }}</p>
      <p>Is Imported: {{ isImported }}</p>
      <p>Tax: {{ price | multiTransform: 'calculateTax': category: isImported }}</p>
      <p>Price with Tax: {{ price | multiTransform: 'calculateHTPrice': category: isImported }}</p>
    </div>
  `
})
export class TestPipeComponent {
  price = 100;
  category = 'CATEGORY_BOOKS';
  isImported = true;
}
