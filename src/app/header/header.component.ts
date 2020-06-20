import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataStorageService} from "../services/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  styleUrls: ['./header.component.scss'],
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.isAuth = !!user
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

  onLogout(){
    this.authService.logout()
  }

  onSaveData() {
    this.dataStorageService.storeData()
  }

  onFetchData() {
    this.dataStorageService.fetchData().subscribe()
  }

}
