import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './common/auth/login/login.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from './common/auth/auth.guard';
import { RegisterComponent } from './common/auth/register/register.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '**', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(appRoutes)],
})
export class AppRoutingModule {}
