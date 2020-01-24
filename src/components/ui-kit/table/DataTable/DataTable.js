import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableRow, TableHead, TableCell, TableBody, TablePagination } from '@material-ui/core';

// DataTable component
// Custom overide of the Table provided by material-ui
// The goal is to provide a DataTable API to display easily data with actions
// cf https://material-ui.com/components/tables/ for documentation
const DataTable = ({ columns, data = [], actions = [] }) => {
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
                            const value = row[column.id]; // Value for the column
                            return (
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
        </Table>
    )
};
DataTable.propTypes = {
    data: PropTypes.array, // Array of data with fields matching the id of columns
    actions: PropTypes.arrayOf(PropTypes.node), // Actions is an array with node for each action. It is highly customizable
    columns: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string, // Unique identifier of the column (it s already the field of the data object too)
        label: PropTypes.string,
        align: PropTypes.string,
        format: PropTypes.func, // Format function
    })),
};
export default DataTable;