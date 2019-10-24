import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { TavernsRoutingModule } from './tavern-routing.module';
import { MyTavernsComponent } from './my-tavern/my-tavern.component';

@NgModule({
    declarations: [MyTavernsComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        TavernsRoutingModule,
    ],
})
export class TavernsModule {}