import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    userName = '';
    password = '';

    constructor(private router: Router, private authService: AuthService) {}

    
    register(): void {
        console.log(this.userName);      
        console.log(this.password); 
    }
   
    cancel(): void {
        this.router.navigateByUrl('/login');
    }
}
