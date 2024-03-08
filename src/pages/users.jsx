import {useEffect, useState} from "react";
import {Box, Grid, TextField, Typography} from "@mui/material";
import {getUsers, deleteUser} from "../services/users.js";
import {EnhancedTable} from "../components/Table.jsx";
import {useTranslation} from "react-i18next";
import {enqueueSnackbar} from "notistack";

const UsersDashboard = () => {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('');
    const {t, i18n} = useTranslation()

    useEffect(() => {
        getUsers().then(({data}) => {
            setUsers(data)
        })
    }, []);

    const filteredValue = search ?
        users.filter(user => user.name.includes(search.toLowerCase()) || user.roles.includes(search.toLowerCase()))
        : users

    const onDeleteUser = async (id) => {
        if(confirm(t('should_delete_user_message'))) {
            await deleteUser(id)
            const updatedUsers = users.filter((user) => user.id !== id);
            setUsers(updatedUsers)
            enqueueSnackbar(t('user_deleted_message'))
        }
    }

    return (
        <Grid container sx={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: 'white',
        }}>
            <Box sx={{ m: 2 }}>
                <Typography fontWeight="bold" fontSize={20} sx={{ mb: 1, color: '#000' }}>{t('usersData')}</Typography>
                <Typography variant="body1" fontSize={14} sx={{ mb: 2, color: '#000' }}>{t('tableSubtitle')}</Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '0 10px',
                    width: '50%',
                    marginBottom: '15px'
                }}>
                    <TextField
                        id="outlined-basic"
                        label={t('filterLabel')}
                        variant="outlined"
                        size="small"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        sx={{ marginRight: '15px'}}
                    />
                </Box>
                <EnhancedTable deleteUser={onDeleteUser} users={filteredValue} />
            </Box>
        </Grid>
    )
}
export default UsersDashboard
