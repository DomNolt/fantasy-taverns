import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoomsService, IRoom } from '../../../rooms/rooms.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-my-tavern-update',
    templateUrl: './my-tavern-update-room.component.html',
})
export class UpdateRoomComponent implements OnInit {
    rooms: IRoom[];
    room: IRoom;
    formGroup: FormGroup;

    constructor(private roomsService: RoomsService, 
                private router: Router, 
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                ) {}

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            RoomName: ['', [Validators.required, Validators.maxLength(100)]],
            DailyRate: ['', [Validators.required]],
        })

        this.roomsService.getAll("").subscribe((rooms) => {
            this.rooms=rooms;
            this.route.params.subscribe(params => {
                this.rooms.forEach((r: IRoom) => {
                  if (r.ID == params.id) {
                    this.room = r;
                    this.formGroup.controls['RoomName'].setValue(this.room.RoomName);
                    this.formGroup.controls['DailyRate'].setValue(this.room.DailyRate);
                  }
                });
              });
        });
    }

    onSubmit() {
        this.room.RoomName = this.formGroup.value.RoomName;
        this.room.DailyRate = this.formGroup.value.DailyRate;

        this.roomsService.updateRoom(this.room).subscribe(
            (response) => {
                this.router.navigateByUrl('/my-tavern');
            },
            (error) => {
                console.log("update failed" + JSON.stringify(error));
            }
        );
    }

    cancel() {
        this.router.navigateByUrl('/my-tavern');
    }

    get RoomName() { return this.formGroup.get('RoomName'); }
	get DailyRate() { return this.formGroup.get('DailyRate'); }
}