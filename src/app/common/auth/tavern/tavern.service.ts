import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ITavern {
    ID: number;
    TavernName: string;
}

@Injectable({
    providedIn: 'root',
})
export class TavernService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<ITavern[]> {
        return this.http.get<ITavern[]>('http://localhost:3000/register');
    }

    getSingle(): Observable<ITavern> {
        return this.http.get<ITavern>('http://localhost:3000/userTavern');
    }
}