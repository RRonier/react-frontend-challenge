import { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { EnhancedTable } from "../components/Table.jsx";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";
import UserDialog from "../components/UserDialog.jsx";
import { fetchUsers, removeUser } from "../store/slices/users.slice.js"
import { useDispatch, useSelector } from 'react-redux';
import Navbar from "../components/Navbar.jsx";

const UsersDashboard = () => {
    const [search, setSearch] = useState('');
    const { t } = useTranslation()
    const [showUserDialog, setShowUserDialog] = useState(false)
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users.entities);
    const {token} = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(fetchUsers(token));
    }, []);

    const filteredValue = search ?
        users.filter(user => user.name.includes(search.toLowerCase()) || user.roles.includes(search.toLowerCase()))
        : users

    const onDeleteUser = async (id) => {
        if (confirm(t('should_delete_user_message'))) {
            dispatch(removeUser({id, token}))
            enqueueSnackbar(t('user_deleted_message'))
        }
    }

    const onCreateUser = () => {
        setShowUserDialog(true)
    }

    const userDialogClose = () => {
        setShowUserDialog(false);
    };

    return (
        <div style={{ width: '100vw', height: '100vh', backgroundColor: 'white' }}>
            <Navbar />
            <Grid container sx={{backgroundColor: 'white'}}>
                <Box sx={{ margin: '10px auto', p: 2 }} className="appContainer">
                    <Typography fontWeight="bold" fontSize={20} sx={{ mb: 1, color: '#000' }}>{t('usersData')}</Typography>
                    <Typography variant="body1" fontSize={14} sx={{ mb: 2, color: '#000' }}>{t('tableSubtitle')}</Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginBottom: '15px'
                    }}>
                        <TextField
                            id="outlined-basic"
                            label={t('filterLabel')}
                            variant="outlined"
                            size="small"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <Button
                            size="large"
                            variant="outlined"
                            onClick={onCreateUser}
                        >{t('add_new_user')}</Button>
                    </Box>
                    <EnhancedTable deleteUser={onDeleteUser} users={filteredValue} />
                </Box>
                {
                    showUserDialog &&
                    <div style={{ zIndex: 999 }}>
                        <UserDialog open={true} handleClose={userDialogClose} />
                    </div>
                }
            </Grid>
        </div>
    )
}
export default UsersDashboard
