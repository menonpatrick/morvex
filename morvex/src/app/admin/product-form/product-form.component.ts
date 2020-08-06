import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
    ) {
    this.categories$ = categoryService.getCategories();

    //  The following statement gets the id when the user
    //  user selects the "edit" button. Clicking "edit"
    //  would add the id of that product to the url and
    //  would redirect to the "admin/products/:id" route
    //  From the above endpoint, we can get the id parameter
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productService.getProduct(this.id).valueChanges()
      .pipe(take(1)).subscribe(p => this.product = p);
      // the "take" operator is used to take just one object from the observable
  }

  save(product) {
    if (this.id) this.productService.updateProduct(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

  ngOnInit() {
  }

}
