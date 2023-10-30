import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  productList$!: Observable<any[]>;
  categoryList$!: Observable<any[]>;
  categoryList: any = [];

  categoryMap: Map<number, string> = new Map();
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productList$ = this.productService.getAllProductList();
    this.categoryList$ = this.categoryService.getAllCategory();
    this.refreshCategoryMap();
  }

  modalClose() {
    this.activateAddEditProductComponent = false;
    this.productList$ = this.productService.getAllProductList();
  }

  refreshCategoryMap() {
    this.categoryService.getAllCategory().subscribe((data) => {
      this.categoryList = data;
      for (let i = 0; i < data.length; i++) {
        this.categoryMap.set(
          this.categoryList[i].id,
          this.categoryList[i].name
        );
      }
      console.log(this.categoryList);
    });
  }

  modalTitle: string = '';
  activateAddEditProductComponent: boolean = false;
  product: any;

  modalAdd() {
    this.product = {
      id: 0,
      name: null,
      categoryId: null,
      quantity: 0,
      price: 0,
      infor: null,
    };
    this.modalTitle = 'Add Product';
    this.activateAddEditProductComponent = true;
  }

  modalEdit(item: any) {
    this.product = item;
    this.modalTitle = 'Edit Product';
    this.activateAddEditProductComponent = true;
  }

  delete(item: any) {
    if (confirm(`Bạn có chắc muốn xóa sản phẩm này không`)) {
      this.productService.deleteProduct(item.id).subscribe((res) => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = 'block';
        }
        setTimeout(function () {
          if (showDeleteSuccess) {
            showDeleteSuccess.style.display = 'none';
          }
        }, 4000);
        this.productList$ = this.productService.getAllProductList();
      });
    }
  }
}
