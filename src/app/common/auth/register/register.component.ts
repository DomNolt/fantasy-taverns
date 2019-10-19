import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { roleId } from '../register/user_roles';
import { Tavern } from './Tavern';

@Component({
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    userName = '';
    password = '';
    roleId : number = 0;
    Taverns = ["Moe's Tavern", "Joe's Tavern", "Blashemy Bar", "Rejected Reality", "Brianna's"];
    Tavern : Tavern = {TavernName: "Moe's Tavern", Id: 1};

    constructor(private router: Router, private authService: AuthService) {
    }

    
    register(): void {
        const user = {
            UserName: this.userName,
            Password: this.password,
            Tavern: this.Tavern,
        }

        console.log(JSON.stringify(user));      

        this.authService.create(user).subscribe((answer) => {
            this.router.navigateByUrl('/login');
        });
    }
   
    cancel(): void {
        this.router.navigateByUrl('/login');
    }
}
