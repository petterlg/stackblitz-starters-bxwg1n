import { TranslateService } from '@ngx-translate/core';
import { ColumnsConfig } from '../../interfaces/intem-list-interfaces';
import { ColumnTypeEnum } from './table.enum';
import {
  Component,
  OnInit,
  Input,
  Output,
  OnDestroy,
  EventEmitter
} from '@angular/core';
import { ActionMenuTable } from './table.interfaces';
import { ItemListStoreService } from '../../../store/item-list/item-list-store.service';
import { TableNameEnum } from '../../types/types';
import { Subscription } from 'rxjs';

/**
 * TableComponent
 *
 */
@Component({
  selector: 'pdc-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() dataSource: any;
  @Input() columnConfig?: Array<ColumnsConfig>;
  @Input() actionMenu?: Array<ActionMenuTable>;

  @Input() isCheckAll: any;
  @Input() menuGlobal: any;

  /**
   * tableName - Pass only if using table component in order to hide/show columns
   */
  @Input()
  tableName!: TableNameEnum;
  @Output() checkBoxEmmitEvent: EventEmitter<any> = new EventEmitter();
  @Output() checkBoxAllCheckEmmitEvent: EventEmitter<any> = new EventEmitter();

  // EXAMPLE DATA
  // dataSource = [
  //   {
  //     col1: 'a',
  //     col2: 'b',
  //     col3: 'c',

  //     href: 'test/url',
  //     actionsMenuTable: [
  //       {
  //         id: 1
  //       },
  //       {
  //         id: 3,
  //         isDisabled: true
  //       }
  //     ]
  //   },

  //   {
  //     col1: 'a2',
  //     col2: 'b2',
  //     col3: 'c2',
  //     actionMenuTable: [
  //       {
  //         id: 1
  //       },
  //       {
  //         id: 3,
  //         isDisabled: true
  //       }
  //     ]
  //   }
  // ];

  // menuGlobal: MenuTable[] = [
  //   {
  //     id: 1,
  //     action: (el): void => this.menuItemClick(el),
  //     label: 'item_1',
  //     icon: 'af2f23'
  //   },
  //   {
  //     id: 2,
  //     action: (el): void => this.menuItemClick(el),

  //     label: 'item_2',
  //     icon: 'af2f23'
  //   },
  //   {
  //     id: 3,
  //     action: (el): void => this.menuItemClick(el),

  //     label: 'item_3',
  //     icon: 'af2f23'
  //   }
  // ];

  // columnConfig = [
  //   {
  //     id: 'menu',
  //     show: true,
  //     type: ColumnTypeEnum.MENU,
  //     src: 'assets/images/icons/3_dots.svg'
  //   },
  //   {
  //     id: 'col1',
  //     label: 'column 1 ',
  //     show: true,
  //     type: ColumnTypeEnum.TEXT,
  //     href: true
  //   },
  //   {
  //     id: 'col2',
  //     label: 'column_2',
  //     show: true,
  //     type: ColumnTypeEnum.TEXT
  //   },
  //   {
  //     id: 'col3',
  //     label: 'column_2',
  //     show: true,
  //     type: ColumnTypeEnum.TEXT
  //   },

  //   {
  //     id: 'deleteBtn',
  //     show: true,
  //     type: ColumnTypeEnum.ICON_BTTN,
  //     src: 'assets/images/icons/delete.svg',
  //     actionType: ColumnActionTypeEnum.DELETE,
  //     canDisplay: true
  //   },

  //   {
  //     id: 'deleteBtnINFO',
  //     show: true,
  //     type: ColumnTypeEnum.ICON_INFO,
  //     src: 'assets/images/icons/delete.svg',
  //     actionType: ColumnActionTypeEnum.DELETE,
  //     canDisplay: true
  //   }
  // ];

  public columnType = ColumnTypeEnum;
  isLoading = false;
  columnsToDisplay?: Array<string> = [];

  /**
   * locale
   */
  locale = '';

  private subscription: Subscription = new Subscription();

  /**
   * @param translateServ
   * @param itemListStoreService
   */
  constructor(
    private readonly translateServ: TranslateService,
    private readonly itemListStoreService: ItemListStoreService
  ) {
    this.locale = this.translateServ.currentLang;
  }

  /**
   * Emit event on click checkbox
   *
   * @param $event checkbox change
   * @param row any
   */
  checkChanged($event: any, row: any): void {
    this.checkBoxEmmitEvent.emit({ $event, row });
  }

  /**
   * Emit event on click All checkbox
   *
   * @param $event boolean
   */
  checkAllChanged($event: boolean): void {
    this.checkBoxAllCheckEmmitEvent.emit($event);
  }

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    if (this.tableName) {
      this.subscription = this.itemListStoreService
        .selectDisplayedColumns(this.tableName)
        .subscribe((data: any) => {
          this.columnsToDisplay = data;
        });
    } else {
      this.columnsToDisplay = this.columnConfig?.map(
        (x: ColumnsConfig) => x.id
      );
    }
  }

  /**
   * @inheritdoc
   */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
