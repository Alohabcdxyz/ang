import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ListProductComponent } from './product/list-product/list-product.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [AuthGuard], // Your main layout component with sidebar
    children: [
      { path: 'category', component: CategoryComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'product', component: ListProductComponent },
      { path: '', component: DashboardComponent },
      {
        path: 'category/edit/:id',
        component: EditCategoryComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
