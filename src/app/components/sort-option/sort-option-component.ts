import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButton, TuiDataList, TuiDropdown, TuiGroup } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiBlock } from '@taiga-ui/kit';
import { SortCriteria, SortParams } from './types.util';
import { DecoratedFormControl } from './decorated.form-control';

@Component({
  selector: 'app-sort-option-component',
  imports: [
    CommonModule,
    TuiDropdown,
    TuiDataList,
    TuiButton,
    ReactiveFormsModule,
    TuiBlock,
    TuiGroup,
  ],
  templateUrl: './sort-option-component.html',
  styleUrl: './sort-option-component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SortOptionComponent {
  sortChange = output<SortParams>();

  protected areOptionsOpened = false;
  protected sortType = new DecoratedFormControl<'asc' | 'desc'>('desc', {
    nonNullable: true,
  });
  protected sortCriteria = new DecoratedFormControl<SortCriteria>(
    'create_date',
    { nonNullable: true }
  );

  constructor() {
    this.sortType.setOnChangeCallback(() => this.emitSortChange());
    this.sortCriteria.setOnChangeCallback(() => this.emitSortChange());
  }

  private emitSortChange(): void {
    this.sortChange.emit({
      criteria: this.sortCriteria.value,
      type: this.sortType.value,
    });
  }

  public mapSortCriteriaToName(criteria: SortCriteria): string {
    switch (criteria) {
      case 'name':
        return 'Имя';
      case 'create_date':
        return 'Дата создания';
      case 'update_date':
        return 'Дата обновления';
      default:
        return '?';
    }
  }
}
