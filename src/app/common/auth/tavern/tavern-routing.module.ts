import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyTavernsComponent } from './my-tavern/my-tavern.component';
import { AuthGuard } from '../auth.guard';
import { AddRoomComponent } from './my-tavern/my-tavern-add-room/my-tavern-add-room.component';
import { MyTavernHeaderComponent } from './my-tavern/my-tavern-header/my-tavern-header.component';
import { UpdateRoomComponent } from './my-tavern/my-tavern-update-room/my-tavern-update-room.component';

const routes: Routes = [
    { path: 'my-tavern', component: MyTavernHeaderComponent, canActivate: [AuthGuard], 
    children: [
        {
            path: '',
            component: MyTavernsComponent,
            canActivate: [AuthGuard],
        },
        {
            path: 'add',
            component: AddRoomComponent,
            canActivate: [AuthGuard],
        },
        {
            path: ":id",
            component: UpdateRoomComponent,
            canActivate: [AuthGuard],
        },
    ],
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class TavernsRoutingModule {}