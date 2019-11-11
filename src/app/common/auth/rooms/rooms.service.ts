import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IRoom {
    ID: number;
    RoomName: string;
    DailyRate: number;
    TavernID: number;
}

@Injectable({
    providedIn: 'root',
})
export class RoomsService {
    constructor(private http: HttpClient) {}

    getAll(roomName: string): Observable<IRoom[]> {
        return this.http.get<IRoom[]>(`http://localhost:3000/my-tavern?roomName=${roomName}`,);
    }

    addRoom(room: IRoom): Observable<IRoom> {
        return this.http.post<IRoom>('http://localhost:3000/my-tavern', room);
    }

    updateRoom(room: IRoom): Observable<IRoom> {
        return this.http.put<IRoom>('http://localhost:3000/my-tavern', room);
    }
}