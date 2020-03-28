import { CountriesDataService } from "./../shared/countries-data.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import CountryDataModel from "../models/country-data.model";
import { Subscription } from "rxjs";
import { ToastController, LoadingController } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit, OnDestroy {
  countriesData: CountryDataModel[] = [];
  countriesDataSubscription: Subscription;
  tableStyle: string = 'bootstrap';
  isError: boolean = false;
  isLoading: boolean = true;

  constructor(
    private titleService: Title,
    private countriesDataService: CountriesDataService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    // Show loading
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    // Set page title
    this.titleService.setTitle("Home");
    // Retrieve countries data
    this.countriesDataSubscription = this.countriesDataService
      .getCountriesData()
      .subscribe(
        countriesData => {
          this.countriesData = countriesData;
        },
        error => {
          this.presentToastWithOptions("An error occurred");
          this.isError = true;
        },
        () => {
          // Disable loading
          this.isLoading = false;
          // Disable loading
          loading.dismiss();
        }
      );
  }

  ngOnDestroy() {
    if( this.countriesDataSubscription != null ) {
      this.countriesDataSubscription.unsubscribe();
    }
    this.countriesData = [];
  }

  async presentToastWithOptions(message: string) {
    const toast = await this.toastController.create({
      header: "Info",
      message: message,
      position: "top",
      buttons: [
        {
          side: "start",
          icon: "star",
          text: "Favorite",
          handler: () => {
            console.log("Favorite clicked");
          }
        },
        {
          text: "Done",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    toast.present();
  }

  switchStyle() {
    if( this.tableStyle == 'dark' ) {
      this.tableStyle = 'bootstrap';
    } else {
      this.tableStyle = 'dark';
    }
  }
}
