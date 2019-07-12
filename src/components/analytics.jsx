import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';

import { AgGridReact } from 'ag-grid-react';
import React, { Component } from 'react';


export default class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: 'Rank',
          field: '_id',
          sortable: true,
          cellRenderer: 'agGroupCellRenderer',
          cellStyle: { 'text-align': 'left' }
        },
        {
          headerName: 'Iteration',
          field: 'iteration',
          sortable: true,
          cellStyle: { 'text-align': 'right' }
        },
        {
          headerName: 'Date',
          field: 'date',
          sortable: true,
          cellRenderer: (data) => {
            return data.value ? (new Date(data.value)).toLocaleDateString() : '';
            },
          cellStyle: { 'text-align': 'center' }
        },
        {
          headerName: 'Total Score',
          field: 'totalscore',
          sortable: true,
          cellStyle: { 'text-align': 'right' }
        }
      ],
      detailCellRendererParams: {
        detailGridOptions: {
          columnDefs: [
            { headerName:'Poker Hand', field: "resultstring", cellStyle: {'text-align': 'left'} },
            { field: "score", cellStyle: {'text-align': 'left'} }
          ],
          onFirstDataRendered(params) {
            params.api.sizeColumnsToFit();
          }
        },
        getDetailRowData: params => {
          params.successCallback(params.data.details);
        }
      }
    };
  }
 
  render() {
    return (
      <div id="">
        <div style={{ height: '500px', width: '800px' }} className="ag-theme-balham">
          <AgGridReact
            columnDefs={this.state.columnDefs}
            masterDetail={true}
            detailCellRendererParams={this.state.detailCellRendererParams}
            rowData={this.props.scores}
          />
        </div>
      </div>
    );
  }
}
