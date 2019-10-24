import { Component, OnInit } from '@angular/core';
import { RoomsService, IRoom } from '../../rooms/rooms.service';
import { ITavern, TavernService } from '../tavern.service';

@Component({
    templateUrl: './my-tavern.component.html',
})
export class MyTavernsComponent implements OnInit {
    rooms: IRoom[];
    TavernName: string;

    constructor(private RoomsService: RoomsService, private TavernService: TavernService) {}

    ngOnInit(): void {
        this.RoomsService.getAll().subscribe((rooms) => (this.rooms = rooms));
        this.TavernService.getSingle().subscribe((tavern) => (this.TavernName = tavern.TavernName));
    }
}