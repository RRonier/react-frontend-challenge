import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useSelector} from "react-redux";
import {Person} from "@mui/icons-material"

export default function Navbar() {
    const {user} = useSelector(state => state.auth)
    return (
        <AppBar position="static">
            <Toolbar sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Users management App
                </Typography>
                {user && user.user &&
                    <div style={{display: 'flex', marginRight: '25px'}}>
                        <Person/>
                        <Typography component="div">
                            {user.user}
                        </Typography>
                    </div>
                }
                <Button color="inherit" onClick={() => localStorage.removeItem('token')}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}