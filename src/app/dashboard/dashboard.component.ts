import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material';
import {Search, Convert, Options, SearchLOC, SearchTime} from '../search';
import {timestamp} from 'rxjs/operators';
import searchToJson = Convert.searchToJson;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() search: Search;
  @ViewChild(MatMenuTrigger) filterTrigger: MatMenuTrigger;

  filters: FilterItem[] = [
    {name: 'Facebook', checked: true},
    {name: 'Instagram', checked: true},
    {name: 'Twitter', checked: true}
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

}

interface FilterItem {
  name: string;
  checked: boolean;
}

interface OptionItem {
  name: string;
}
