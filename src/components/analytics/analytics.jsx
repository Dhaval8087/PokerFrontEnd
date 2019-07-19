import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
const outercolumns = [
    {
        Header: 'Rank',
        accessor: "_id",
        Cell: props => <span>{props.original._id}</span>
    },
    {
        Header: 'Iteration',
        accessor: 'iteration'
    },
    {
        Header: 'Date',
        accessor: "date",
        Cell: props => (props.value ? (new Date(props.value)).toLocaleDateString() : '')

    },
    {
        Header: 'Total Score',
        accessor: 'totalscore'
    },
];
const innercolumns = [
    {
        Header: 'Poker Hand',
        accessor: 'resultstring'
    },
    {
        Header: 'Score',
        accessor: 'score'
    }
]
export default class Analytics extends Component {
    render() {
        return (
           
                <div style={{ height: '500px', width: '800px' }} className='mt-3'>
                    <ReactTable
                        data={this.props.scores}
                        columns={outercolumns}
                        pageSize={this.props.scores ? this.props.scores.length : 5}
                        showPagination={false}
                        className='-striped -highlight'
                        SubComponent={row => {
                            return (
                                <div style={{ padding: '20px' }}>
                                    <ReactTable
                                        data={row.original.details}
                                        columns={innercolumns}
                                        pageSize={row.original.details.length}
                                        showPagination={false}
                                    />
                                </div>
                            );
                        }}
                    />
                </div>
        )
    }
}
