import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { TavernsRoutingModule } from './tavern-routing.module';
import { MyTavernsComponent } from './my-tavern/my-tavern.component';
import { AddRoomComponent } from './my-tavern/my-tavern-add-room/my-tavern-add-room.component';
import { MyTavernHeaderComponent } from './my-tavern/my-tavern-header/my-tavern-header.component';
import { UpdateRoomComponent } from './my-tavern/my-tavern-update-room/my-tavern-update-room.component';

@NgModule({
    declarations: [MyTavernsComponent, AddRoomComponent, MyTavernHeaderComponent, UpdateRoomComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        TavernsRoutingModule,
    ],
})
export class TavernsModule {}