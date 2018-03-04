import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { AuthService, CustomUser } from '@core/auth.service';
import searchToJson = Convert.searchToJson;
import { timestamp } from 'rxjs/operators';
import { SearchService } from '../core/search.service';
import { Convert, Options, Search, SearchLOC, SearchTime } from '../search';

const SMALL_WIDTH_BREAKPOINT: number = 720;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private mediaMatcher: MediaQueryList =
                        matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  navTooltipPosition: string = 'right';
  user: any = null;

  @Input() search: Search;
  @ViewChild(MatMenuTrigger) filterTrigger: MatMenuTrigger;

  filters: FilterItem[] = [
    {name: 'Google',    checked: true, icon: 'fa-google'},
    {name: 'Facebook',  checked: true, icon: 'fa-facebook'},
    {name: 'Instagram', checked: true, icon: 'fa-instagram'},
    {name: 'Twitter',   checked: true, icon: 'fa-twitter'}
  ];

  options: OptionItem[] = [];

  searchTerm(): void {
    console.log(timestamp() + ': ', searchToJson(this.search));
  }

  constructor(private auth: AuthService, private searchServe: SearchService) { }

  ngOnInit(): void {
    for (let i: number = 1; i <= 5; i++) {
      this.options.push({ name: `Option ${i}` });
    }

    this.searchServe.sendSearch({
      query: 'test string',
      options: {
        privateSearch: false,
        searchLoc: {
          lat: 39.01,
          long: -84.51,
          radius: 10
        },
        searchTime: {
          start: 100000001,
          end: 1000000000003
        }
      }
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  loginWith(prov: string): void {
    if ('google' === prov.toLowerCase()) {
      this.auth.googleLogin();
    } else if ('facebook' === prov.toLowerCase()) {
      this.auth.facebookLogin();
    } else if ('instagram' === prov.toLowerCase()) {
      this.auth.instagramLogin();
    } else if ('twitter' === prov.toLowerCase()) {
      this.auth.twitterLogin();
    } else {
      console.log('Error: not a provider');
    }
  }

}

interface FilterItem {
  name:     string;
  checked:  boolean;
  icon:     string;
}

interface OptionItem {
  name: string;
}
