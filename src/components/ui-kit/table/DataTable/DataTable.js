import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableRow, TableHead, TableCell, TableBody, TablePagination } from '@material-ui/core';

// DataTable component
// Custom overide of the Table provided by material-ui
// The goal is to provide a DataTable API to display easily data with actions
// cf https://material-ui.com/components/tables/ for documentation
const DataTable = ({ columns, data = [] }) => {
    const [page, setPage] = React.useState(0); // Current page in the table
    const [rowsPerPage, setRowsPerPage] = React.useState(25); // Number of rows per page

    // Handle click on change page button
    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    // Handle change of number of rows per page
    const handleChangeRowsPerPage = (e) => {
        const { target } = e;
        setRowsPerPage(target.value); // Update number of rows per page
        setPage(0); // Reset page set base (0)
    };

    return (
        <Table stickyHeader aria-label="data table">
            {/** Table Head */}
            <TableHead>
                <TableRow>
                    {columns.map(column => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                        >
                            {column.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            {/** Table body */}
            <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                    <TableRow hover tabIndex={-1} key={row.id}>
                        {columns.map(column => {
                            const value = column.isAction ? row : row[column.id]; // Value for the column (value is the complete row if this is an action)
                            return column.isAction ?
                                // This is an action, display the custom component provided.
                                (
                                    <TableCell key={column.id}>
                                        <div onClick={e => column.onClick(e, value)}>
                                            {column.component}
                                        </div>
                                    </TableCell>
                                )
                                :
                                // This is a classic row, display the data
                                (
                                    <TableCell key={column.id} align={column.align}>
                                        {column.format ? column.format(value) : value}
                                    </TableCell>
                                )
                        })}
                    </TableRow>
                ))}
            </TableBody>
            {/** Pagination */}
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage} />
        </Table >
    )
};
DataTable.propTypes = {
    data: PropTypes.array, // Array of data with fields matching the id of columns
    columns: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string, // Unique identifier of the column (it s already the field of the data object too)
        label: PropTypes.string, // Label of the column
        align: PropTypes.string, // Where to align data in cell
        format: PropTypes.func, // Format function
        isAction: PropTypes.bool, // If true, that means that this row contains an "Action". Action are button to trigger something
        component: PropTypes.node, // Component is a React node. It is required if isAction is true
        onClick: PropTypes.func, // Function called on click on the item in the column (used for actions mainly)
    })),
};
export default DataTable;