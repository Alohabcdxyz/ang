import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  addCategoryrequest: Category = {
    id: 0,
    name: '',
    categoryImage: '',
  };

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const fileInput: HTMLInputElement = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  addEmployee() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.addCategoryrequest.name);
      formData.append('categoryImageView', this.selectedFile);

      this.categoryService.addEmployee(formData).subscribe({
        next: (category) => {
          console.log(category);

          this.router.navigate(['category']);
        },
        error: (error) => {
          console.error('Error occurred:', error);
        },
      });
    }
  }
}
