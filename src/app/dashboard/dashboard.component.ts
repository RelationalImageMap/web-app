import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material';
import {Search, Convert, Options, SearchLOC, SearchTime} from '../search';
import {timestamp} from 'rxjs/operators';
import searchToJson = Convert.searchToJson;

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  @Input() search: Search;
  @ViewChild(MatMenuTrigger) filterTrigger: MatMenuTrigger;

  filters: FilterItem[] = [
    {name: 'Facebook', checked: true, icon: 'fa-facebook'},
    {name: 'Instagram', checked: true, icon: 'fa-instagram'},
    {name: 'Twitter', checked: true, icon: 'fa-twitter'}
  ];

  options: OptionItem[] = [];

  searchTerm(): void {
    console.log(timestamp() + ': ', searchToJson(this.search));
  }

  constructor() {
  }

  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this.options.push({ name: `Option ${i}` });
    }
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}

interface FilterItem {
  name: string;
  checked: boolean;
  icon: string;
}

interface OptionItem {
  name: string;
}
