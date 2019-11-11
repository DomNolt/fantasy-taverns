import { Component, OnInit } from '@angular/core';
import { RoomsService, IRoom } from '../../../rooms/rooms.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-my-tavern-add',
    templateUrl: './my-tavern-add-room.component.html',
})
export class AddRoomComponent implements OnInit {
    rooms: IRoom[];

    constructor(private roomsService: RoomsService, private router: Router) {}

    ngOnInit(): void {
        
    }

    addRoom(form: NgForm): void {
        if(form.valid) {
            console.log(JSON.stringify(form.value));
            this.roomsService.addRoom(form.value).subscribe((answer) => {
                this.router.navigateByUrl('/my-tavern');
            });
        }
    }

    cancel(): void {
        this.router.navigateByUrl('/my-tavern');
    }
}