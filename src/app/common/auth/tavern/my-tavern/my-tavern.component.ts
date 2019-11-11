import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoomsService, IRoom } from '../../rooms/rooms.service';
import { ITavern, TavernService } from '../tavern.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { AuthService } from '../../../../common/auth/auth.service';


@Component({
    selector: 'app-my-tavern',
    templateUrl: './my-tavern.component.html',
})
export class MyTavernsComponent implements OnInit, OnDestroy {
    rooms: IRoom[];
    TavernName: string;
    searchText: '';
    searchUpdated = new Subject<string>();
    subscription = new Subscription();

    constructor(private RoomsService: RoomsService, 
                private TavernService: TavernService, 
                private router: Router,
                private route: ActivatedRoute,
                private authService: AuthService,
                ) {
                    this.subscription.add(
                        this.searchUpdated.pipe(debounceTime(300),distinctUntilChanged(),)
                        .subscribe((newValue) => {
                            this.searchRooms(newValue)
                        }),
                    );
                    // example of how to get and listen for changes in the
                    // current user subject from the auth service
                    this.subscription.add(
                        this.authService.currentUser.subscribe((user) => {
                            console.log(user);
                        }),
                    );
                }
    ngOnInit(): void {
        //this.RoomsService.getAll().subscribe((rooms) => (this.rooms = rooms));
        this.searchRooms("");
        this.TavernService.getSingle().subscribe((tavern) => (this.TavernName = tavern.TavernName));
    }

    searchRooms(newValue: string): void {
        this.RoomsService.getAll(newValue).subscribe((rooms) => (this.rooms=rooms));
    }

    addRoom(): void {
        this.router.navigateByUrl('/my-tavern/add');
    }

    search($event): void {
        this.searchUpdated.next($event.target.value);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}