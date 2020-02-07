import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, TableRow, TableHead, TableCell, TableBody, TablePagination, Paper, Toolbar, Typography, Checkbox, TableSortLabel, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Searchbar } from '../../form';
import { Loading } from '../../feedback';

// Style def
// Base style
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        loading: {
            padding: theme.spacing(2)
        },
        head: {
            color: theme.palette.common.black,
        },
        row: {
            cursor: "pointer",
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    })
);
// Toolbar style
const useToolbarStyles = makeStyles((theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.primary[500],
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
        title: {
            flex: '1 1 100%',
            color: theme.palette.common.white,
        },
    })
);
// DataTable component
// Custom overide of the Table provided by material-ui
// The goal is to provide a DataTable API to easily display data with actions/selection
// cf https://material-ui.com/components/tables/ for documentation
const DataTable = ({ title, columns, translation, loading = false, search = true, onSelectChanged = () => { }, data = [], checkable = true, actions = [] }) => {
    const classes = useStyles();
    // State
    const [page, setPage] = React.useState(0); // Current page in the table
    const [rowsPerPage, setRowsPerPage] = React.useState(10); // Number of rows per page
    const [order, setOrder] = React.useState('asc'); // Order ["asc","desc"]
    const [orderBy, setOrderBy] = React.useState(''); // Order by (name of the filed to order by)
    const [selected, setSelected] = React.useState([]); // Selected items in the table
    const [filteredData, setFilteredData] = React.useState([]);

    // Effect
    // When data array change, reset everything to keep consistent
    useEffect(() => {
        setFilteredData(data); // Reset data
        setPage(0); // Reset page
        setOrder('asc'); // Reset order
        setOrderBy(''); // Reset order by
        setSelected([]); // Reset selection
    }, [data]);

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

    // Handle sort request (asc/desc)
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc'); // change order
        setOrderBy(property); // order by property
    };

    // Handle select one click
    const handleSelectOneClick = (item) => {
        let updated = []; // Will contains the selected values updated
        if (selected.find(value => value.id === item.id)) {
            // already selected, remove it
            updated = selected.filter(value => value.id !== item.id); // Remove item from selected items
        } else {
            updated = [...selected, item]; // Push new item in selected items
        }
        setSelected(updated); // Update selected items
        onSelectChanged(updated); // Trigger update to upper component
    };

    // Handle click on "select all"
    const handleSelectAllClick = ({ target }) => {
        if (target && target.checked) {
            setSelected(data);
            onSelectChanged(data); // Trigger selection changed
        } else {
            setSelected([]); // Deselect all because the checkbox is not checked
            onSelectChanged([]); // trigger selection changed
        }
    };

    // Sort
    const desc = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    // Sort array of data
    const stableSort = (array, cmp) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    };

    // Get array sorting
    const getSorting = (order, orderBy) => {
        return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
    };

    // if item is selected, return true
    const isSelected = id => {
        return selected.find(value => value.id === id) ? true : false; // Get the item matching id
    };

    return (
        <Paper>
            {/** Toolbar */}
            <EnhancedTableToolbar
                title={title}
                translation={translation}
                items={data}
                updateItems={setFilteredData}
                selectedItems={selected}
                numSelected={selected.length}
                actions={actions}
                search={search} />
            {/** Table */}
            <Table aria-label="data table" stickyHeader>
                {/** Table Head */}
                <EnhancedTableHead
                    checkable={checkable}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={filteredData.length}
                    headCells={columns}
                />
                {/** Table body */}
                <TableBody>
                    {stableSort(filteredData, getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                            const rowSelected = isSelected(row.id); // Get selected state
                            return (
                                <TableRow selected={rowSelected} className={classes.row} onClick={(e) => handleSelectOneClick(row)} hover tabIndex={-1} key={index}>
                                    {/** Checkbox of the row to select the item */}
                                    {checkable &&
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={rowSelected} />
                                        </TableCell>}
                                    {columns.map((column, index) => {
                                        const value = column.isAction ? row : row[column.id]; // Value for the column (value is the complete row if this is an action)
                                        return (
                                            <TableCell size="small" key={index} align={column.align}>
                                                {column.isAction ?
                                                    // action to display
                                                    column.component(row) // Render component passing row item
                                                    :
                                                    // classic data display
                                                    column.format ? column.format(value) : value ? value : ''
                                                }
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table >
            {loading &&
                <Grid container justify="center" className={classes.loading}>
                    <Loading />
                </Grid>}
            {/** Pagination */}
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                labelRowsPerPage={translation["DATATABLE_ROWS_PER_PAGE"]}
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} | ${count}`} />
        </Paper>
    )
};

DataTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Unique id of item. Used to filter selection
    })).isRequired, // Array of data with fields matching the id of columns
    columns: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string, // Unique identifier of the column (it s already the field of the data object too)
        label: PropTypes.string, // Label of the column
        align: PropTypes.oneOf(["right", "left", "center"]), // Where to align data in cell
        format: PropTypes.func, // Format function
        isAction: PropTypes.bool, // If true, that means that this row contains an "Action". Action are button to trigger something
        component: PropTypes.func, // Component is a React node. It is required if isAction is true
    })).isRequired,
    title: PropTypes.string.isRequired, // Title in the head of the table
    onSelectChanged: PropTypes.func, // Function called when selection changes (return the list of selected items)
    checkable: PropTypes.bool, // Define if the table can check multiple items
    translation: PropTypes.object, // Translation provided by redux
    actions: PropTypes.arrayOf(PropTypes.shape({
        component: PropTypes.func, // Component to display
    })), // Action are items displayed in the toolbar to trigger actions in the table.
    search: PropTypes.bool, // If true, display the search bar in the toolbar
    loading: PropTypes.bool, // State to toggle if table data are not ready yet (from API)
};
// // //
// Redux connexion
const mapStateToProps = state => ({
    translation: state.lang.translation, // Current location in the app
});
export default connect(mapStateToProps)(DataTable);

// // //
// Enhanced Table Toolbar
// Toolbar to display number of selected items in the list
// cf https://material-ui.com/components/tables/ (Sorting and selecting)
const EnhancedTableToolbar = ({ title, translation, updateItems, search = true, items = [], selectedItems = [], numSelected = 0, actions = [] }) => {
    const classes = useToolbarStyles();

    // Handle Typing in search
    const handleSearchInTable = (e, value) => {
        if (value !== null) {
            const filteredData = items.filter(item => {
                let contains = false;
                Object.keys(item).forEach(key => {
                    const itemVal = item[key].toString();
                    if (itemVal.toLowerCase().includes(value.toLowerCase()) && key !== "id") {
                        // check each key of item (if equals)
                        contains = true;
                        return;
                    }
                });
                return contains;
            });
            updateItems(filteredData); // Update items
        } else {
            updateItems(items); // Reset items if search is empty
        }
    };

    return (
        <Toolbar
            className={clsx(classes.root, classes.highlight)}>
            <Grid container alignItems="center" justify="space-between">
                {/** Title / Num selected */}
                <Grid item>
                    {numSelected > 0 ?
                        (<Typography className={clsx(classes.title)} color="inherit" variant="subtitle1">
                            {`${numSelected} ${translation["DATATABLE_NBR_ROW_SELECTED"]}`}
                        </Typography>)
                        :
                        (<Typography className={classes.title} variant="h6" id="tableTitle">
                            {title}
                        </Typography>)}
                </Grid>
                {/** Actions */}
                <Grid item>
                    <Grid container alignItems="center" justify="space-around" spacing={2}>
                        {actions.map((action, index) =>
                            (
                                <Grid key={index} item>
                                    {action.component(selectedItems)}
                                </Grid>
                            ))}
                        {search && <Grid item><Searchbar onChange={handleSearchInTable} /></Grid>}
                    </Grid>
                </Grid>
            </Grid>
        </Toolbar >
    );
};

EnhancedTableToolbar.propTypes = {
    title: PropTypes.string.isRequired,
    search: PropTypes.bool, // if true, display the searchbar
    translation: PropTypes.object.isRequired,
    selectedItems: PropTypes.array,
    updateItems: PropTypes.func, // Function to update the items to display (for filter purpose)
    items: PropTypes.array,
    numSelected: PropTypes.number.isRequired,
    actions: PropTypes.arrayOf(PropTypes.shape({
        component: PropTypes.func, // Component to display
    })),
};

// // //
// Enhanced Table head
// cf https://material-ui.com/components/tables/ (Sorting and selecting)
function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, checkable = true, headCells = [] }) {
    const classes = useStyles();
    // Sort handler used to sort the table
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow >
                {/** Checkbox to select all */}
                {checkable &&
                    <TableCell padding="checkbox" className={classes.head}>
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{ 'aria-label': 'select all' }}
                        />
                    </TableCell>}
                {/** Columns */}
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        sortDirection={orderBy === headCell.id ? order : false}>
                        {/** Table label with sort icon */}
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}>
                            <Typography className={classes.head}>{headCell.label}</Typography>
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    headCells: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string, // Unique identifier of the column (it s already the field of the data object too)
        label: PropTypes.string, // Label of the column
        align: PropTypes.oneOf(["right", "left", "center"]), // Where to align data in cell
        format: PropTypes.func, // Format function
        isAction: PropTypes.bool, // If true, that means that this row contains an "Action". Action are button to trigger something
        component: PropTypes.func, // Component is a func that return a react node. It is required if isAction is true
        onClick: PropTypes.func, // Function called on click on the item in the column (used for actions mainly)
    })).isRequired, // Head definition
};