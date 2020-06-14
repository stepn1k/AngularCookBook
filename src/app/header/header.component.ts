import {Component} from "@angular/core";
import {DataStorageService} from "../services/data-storage.service";

@Component({
  styleUrls: ['./header.component.scss'],
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService) {
  }

  onSaveData() {
    this.dataStorageService.storeData()
  }

  onFetchData() {
    this.dataStorageService.fetchData().subscribe()
  }

}
