import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { visuallyHidden } from '@mui/utils';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux'
import UserInfoDialog from "../components/UserInfoDialog.jsx"

function EnhancedTableHead(props) {
    // eslint-disable-next-line react/prop-types
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;
    const { t } = useTranslation()

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {[{ label: t('user').toUpperCase() }, { label: t('email').toUpperCase() }, { label: t('roles').toUpperCase() }, { label: t('actions').toUpperCase() }].map((headCell, i) => (
                    <TableCell
                        key={i}
                        align={'left'}
                        padding='normal'
                    >
                        <TableSortLabel>
                            {headCell.label}
                            {orderBy === i ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

// eslint-disable-next-line react/prop-types
export const EnhancedTable = ({ users, deleteUser }) => {
    const [selected, setSelected] = useState([]);
    const { t } = useTranslation()
    const { user } = useSelector(state => state.auth)

    const [userInfoOpen, setUserInfoOpen] = useState(false);

    const handleUserInfoOpen = () => {
        setUserInfoOpen(true);
    };
    const handleUserInfoClose = () => {
        setUserInfoOpen(false);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 650 }}
                        aria-labelledby="tableTitle"
                        size='medium'
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                        />
                        <TableBody>
                            {/* eslint-disable-next-line react/prop-types */}
                            {users && users.length ? users.map((row, index) => {
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.name)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox" align="right">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                            align="left"
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="left">{row.roles.join(", ")}
                                        </TableCell>
                                        <TableCell align="left" sx={{ display: "flex", alignItems: "center", justifyContent: 'flex-start' }}>
                                            {
                                                user === 'admin' && (
                                                    <>
                                                        <IconButton onClick={(event) => {
                                                            deleteUser(row.id)
                                                            event.stopPropagation();
                                                        }}>
                                                            <DeleteOutlinedIcon />
                                                        </IconButton>
                                                        <IconButton onClick={(e) => {
                                                            e.stopPropagation()
                                                            console.log({ row })
                                                        }}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </>
                                                )
                                            }
                                            <IconButton onClick={handleUserInfoOpen}>
                                                <VisibilityOutlinedIcon />
                                            </IconButton>
                                        </TableCell>
                                        {
                                            userInfoOpen && <div style={{ zIndex: 999 }}>
                                                <UserInfoDialog user={row} open={handleUserInfoOpen} handleClose={handleUserInfoClose} />
                                            </div>
                                        }
                                    </TableRow>
                                );
                            }) : <></>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}