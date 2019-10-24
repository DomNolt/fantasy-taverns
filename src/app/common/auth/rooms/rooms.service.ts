import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IRoom {
    RoomName: string;
    DailyRate: number;
    TavernID: number;
}

@Injectable({
    providedIn: 'root',
})
export class RoomsService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<IRoom[]> {
        return this.http.get<IRoom[]>('http://localhost:3000/my-tavern');
    }
}