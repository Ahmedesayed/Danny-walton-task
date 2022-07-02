import {
  Component,
  Input,
  OnInit,
  Output,
  TemplateRef,
  EventEmitter,
} from '@angular/core';
import { SelectItemComponent } from '../select-item/select-item.component';
import { SortType } from '../services/api/iapi-config';

@Component({
  selector: 'app-searchable-selection-list',
  templateUrl: './searchable-selection-list.component.html',
  styleUrls: ['./searchable-selection-list.component.scss'],
})
export class SearchableSelectionListComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @Input() items: any[] = [];
  @Input() searchable: boolean = false;
  @Input() filterable: boolean = false;
  @Input() filterOptions: { name: string; id: string | number }[] = [];
  @Input() itemTemp: TemplateRef<SelectItemComponent> =
    {} as TemplateRef<SelectItemComponent>;
  @Input() searchPlaceholder: string = '';
  @Input() title: string = '';
  @Input() filterPlaceholder: string = '';
  @Input() sortable: boolean = false;
  @Input() shouldLoadMore: boolean = false;
  sortType: SortType = SortType.Descending;
  searchTimeout: NodeJS.Timeout | undefined;
  searchTerm: string = '';
  @Output() onScrollEnd: EventEmitter<boolean> = new EventEmitter();
  @Output() onSearchEnd: EventEmitter<string> = new EventEmitter();
  @Output() onFilterChange: EventEmitter<any> = new EventEmitter();
  @Output() onSortChange: EventEmitter<SortType> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSearch(ev?: any) {
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.onSearchEnd.emit(this.searchTerm);
    }, 700);
  }

  onFilter(ev: any) {
    this.onFilterChange.emit(ev);
  }

  onSort() {
    if (this.sortType == SortType.Descending)
      this.sortType = SortType.Ascending;
    else this.sortType = SortType.Descending;
    this.onSortChange.emit(this.sortType);
  }

  onScroll(event: any) {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      if (!this.isLoading && this.shouldLoadMore) this.onScrollEnd.emit();
    }
  }
}
