import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyTavernsComponent } from './my-tavern/my-tavern.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
    { path: 'my-tavern', component: MyTavernsComponent, canActivate: [AuthGuard] },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class TavernsRoutingModule {}