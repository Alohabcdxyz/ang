import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  categoryDetail: Category = {
    id: 0,
    name: '',
    categoryImage: '',
  };
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const fileInput: HTMLInputElement = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id: any = params.get('id');

        if (id) {
          this.categoryService.getCategory(id).subscribe({
            next: (response) => {
              this.categoryDetail = response;
            },
          });
        }
      },
    });
  }

  updateCategory() {
    if (this.categoryDetail.id) {
      const formData = new FormData();
      formData.append('id', this.categoryDetail.id.toString());
      formData.append('name', this.categoryDetail.name);

      if (this.selectedFile) {
        formData.append('categoryImageView', this.selectedFile);
      }

      this.categoryService
        .UpdateCategory(this.categoryDetail.id, formData)
        .subscribe({
          next: (category) => {
            this.router.navigate(['category']);
          },
          error: (error) => {
            console.error('Error occurred:', error);
          },
        });
    }
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (response) => {
        this.router.navigate(['category']);
      },
    });
  }
}
