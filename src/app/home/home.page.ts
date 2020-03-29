import { CountriesDataService } from "../shared/countries-data.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import CountryDataModel from "../models/country-data.model";
import { Subscription } from "rxjs";
import { ToastController, LoadingController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  countriesData: CountryDataModel[] = [];
  baseCountriesData: CountryDataModel[] = [];
  countriesDataSubscription: Subscription;
  tableStyle: string = "bootstrap";
  isError: boolean = false;
  isLoading: boolean = true;

  constructor(
    private titleService: Title,
    private countriesDataService: CountriesDataService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  async ionViewWillEnter() {
    // Initialize data
    this.countriesData = [];
    // Show loading
    const loading = await this.loadingController.create({
      message: "Please wait..."
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
          this.baseCountriesData = countriesData;
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

  ionViewDidLeave() {
    if (this.countriesDataSubscription != null) {
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
    if (this.tableStyle == "dark") {
      this.tableStyle = "bootstrap";
    } else {
      this.tableStyle = "dark";
    }
  }

  // Filter countries based on user input
  async onCountriesFilter(event: any) {
    const value = event.target.value;
    // Filter values
    if( value != "" ) {
      this.countriesData = [
        ...this.baseCountriesData.filter(
          countryData =>
            (countryData.country.toLowerCase().indexOf(value.toLowerCase().trim()) !== -1 )
        )
      ];
    } else {
      // Show loading
      const loading = await this.loadingController.create({
        message: "Please wait..."
      });
      await loading.present();
      this.countriesData= [...this.baseCountriesData];
      await loading.dismiss();
    }
  }
}
