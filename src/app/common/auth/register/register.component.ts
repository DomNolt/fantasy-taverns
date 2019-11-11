import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TavernService, ITavern} from '../tavern/tavern.service';
import { stringify } from 'querystring';

@Component({
    templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
    userName = '';
    password = '';
    Taverns : ITavern[];
    selectTavern : ITavern = {ID: 0, TavernName: ""};

    constructor(private router: Router, private authService: AuthService, private tavernService: TavernService) {

    }

    ngOnInit(): void {
        this.tavernService.getAll().subscribe((taverns) => (this.Taverns = taverns));
    }

    register(): void {
        const user = {
            UserName: this.userName,
            Password: this.password,
            Tavern: this.selectTavern,
        }    

        this.authService.create(user).subscribe((answer) => {
            this.router.navigateByUrl('/login');
        });
    }
   
    cancel(): void {
        this.router.navigateByUrl('/login');
    }
}
