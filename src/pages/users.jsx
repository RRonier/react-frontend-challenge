import {useEffect, useState} from "react";
import {Box, Grid, TextField, Typography} from "@mui/material";
import {getUsers} from "../services/users.js";
import {EnhancedTable} from "../components/Table.jsx";

const UsersDashboard = () => {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('');

    useEffect(() => {
        getUsers().then(({data}) => {
            setUsers(data)
        })
    }, []);

    const filteredValue = search ?
        users.filter(user => user.name.includes(search.toLowerCase()) || user.roles.includes(search.toLowerCase()))
        : users

    return (
        <Grid container sx={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: 'white',
        }}>
            <Box sx={{ m: 2 }} style={{border: '1px dashed red'}}>
                <Typography fontWeight="bold" fontSize={20} sx={{ mb: 1, color: '#000' }}>Users Data</Typography>
                <Typography variant="body1" fontSize={14} sx={{ mb: 2, color: '#000' }}>Detailed list of users in the database</Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '0 10px',
                    width: '50%',
                    marginBottom: '15px'
                }}>
                    <TextField
                        id="outlined-basic"
                        label="Filter by name"
                        variant="outlined"
                        size="small"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        sx={{ marginRight: '15px'}}
                    />
                </Box>
                <EnhancedTable users={filteredValue} />
            </Box>
        </Grid>
    )
}
export default UsersDashboard
