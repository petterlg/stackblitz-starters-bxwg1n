import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { ColumnTypeEnum } from './table.enum';
import { ColumnsConfig } from '../../interfaces/intem-list-interfaces';

import { ItemListStoreService } from '../../../store/item-list/item-list-store.service';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { TableNameEnum } from '../../types/types';

let table: TableComponent;
let fixture: ComponentFixture<TableComponent>;
let itemListStoreService: ItemListStoreService;

const columnConfig: Array<ColumnsConfig> = [
  {
    id: 'checkbox',
    type: ColumnTypeEnum.CHECKBOX
  },
  {
    id: 'conceptGroupCode',
    label: 'concepts.common.group',
    show: true
  },
  {
    id: 'concept',
    label: 'concepts.common.concept',
    show: true
  },
  {
    id: 'journalConcept',
    label: 'concepts.common.conceptJournal',
    show: true
  },
  {
    id: 'order',
    label: 'common.order',
    show: true
  },
  {
    id: 'conceptType',
    label: 'common.type',
    show: true
  },
  {
    id: 'formLongPrec',
    label: 'common.formLongPrec',
    show: true
  },
  {
    id: 'numberOccurs',
    label: 'concepts.list.numOccur',
    show: true
  }
];
const dataSource: any = [
  {
    possitdel: '639N/AN/A',
    accountingCenter: '00490141',
    accountingCurrency: 'EUR',
    accountingKey: '004901411030132182',
    centro: '004914133',
    cvc: 'INCGRL',
    instance: 'ESR1',
    messageDescription:
      'ACCOUNTING DEFINITION MISSING FOR PRODUCT/SUBTYPE AND CVC_1',
    portfolio: 'N/A',
    referenceCurrency: 'EUR',
    sector: 'N/A',
    settlement: 'N/A',
    detalle: 'Detalle 1',
    timestampModification: '2023-01-07T12:41:52.520996'
  },
  {
    possitdel: '639N/AN/A',
    accountingCenter: '00490141',
    accountingCurrency: 'EUR',
    accountingKey: '004901411030132182',
    centro: '004914133',
    cvc: 'INCGRL',
    instance: 'ESR1',
    messageDescription:
      'ACCOUNTING DEFINITION MISSING FOR PRODUCT/SUBTYPE AND CVC_2',
    portfolio: 'N/A',
    referenceCurrency: 'EUR',
    sector: 'N/A',
    settlement: 'N/A',
    detalle: 'Detalle_2',
    timestampModification: '2023-02-07T12:41:52.520996'
  },
  {
    possitdel: '639N/AN/A',
    accountingCenter: '00490141',
    accountingCurrency: 'EUR',
    accountingKey: '004901411030132182',
    centro: '004914133',
    cvc: 'INCGRL',
    instance: 'ESR1',
    messageDescription:
      'ACCOUNTING DEFINITION MISSING FOR PRODUCT/SUBTYPE AND CVC_3',
    portfolio: 'N/A',
    referenceCurrency: 'EUR',
    sector: 'N/A',
    settlement: 'N/A',
    detalle: 'Detalle_3',
    timestampModification: '2023-03-07T12:41:52.520996'
  },
  {
    possitdel: '639N/AN/A',
    accountingCenter: '00490141',
    accountingCurrency: 'EUR',
    accountingKey: '004901411030132182',
    centro: '004914133',
    cvc: 'INCGRL',
    instance: 'ESR1',
    messageDescription:
      'ACCOUNTING DEFINITION MISSING FOR PRODUCT/SUBTYPE AND CVC_4',
    portfolio: 'N/A',
    referenceCurrency: 'EUR',
    sector: 'N/A',
    settlement: 'N/A',
    detalle: 'Detalle_4',
    timestampModification: '2023-04-07T12:41:52.520996'
  },
  {
    possitdel: '639N/AN/A',
    accountingCenter: '00490141',
    accountingCurrency: 'EUR',
    accountingKey: '004901411030132182',
    centro: '004914133',
    cvc: 'INCGRL',
    instance: 'ESR1',
    messageDescription:
      'ACCOUNTING DEFINITION MISSING FOR PRODUCT/SUBTYPE AND CVC_5',
    portfolio: 'N/A',
    referenceCurrency: 'EUR',
    sector: 'N/A',
    settlement: 'N/A',
    detalle: 'Detalle_5',
    timestampModification: '2023-05-07T12:41:52.520996'
  }
];

describe('Create TableComponent componente', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatCheckboxModule,
        MatTableModule,
        TranslateModule.forRoot()
      ],
      declarations: [TableComponent],
      providers: [ItemListStoreService, provideMockStore({ initialState: {} })]
    }).compileComponents();
  });

  beforeEach(() => {
    itemListStoreService = TestBed.inject(ItemListStoreService);
    spyOn(itemListStoreService, 'selectDisplayedColumns').and.returnValue(
      of(['checkbox', 'conceptGroupCode', 'concept'])
    );
    fixture = TestBed.createComponent(TableComponent);
    table = fixture.componentInstance;
    table.columnConfig = columnConfig;
    table.dataSource = dataSource;
    table.isCheckAll = dataSource;
    table.tableName = TableNameEnum.CONCEPT_OBB;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(table).toBeTruthy();
  });
  it('should emit checkBoxEmmitEvent when checkbox is clicked', () => {
    const emitSpy = spyOn(table.checkBoxEmmitEvent, 'emit');
    table.checkChanged(new Event(''), true);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit checkBoxEmmitEvent when checkbox is clicked', () => {
    const emitSpy = spyOn(table.checkBoxAllCheckEmmitEvent, 'emit');
    table.checkAllChanged(true);
    expect(emitSpy).toHaveBeenCalled();
  });
});
