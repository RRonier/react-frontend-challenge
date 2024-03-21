import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { Person } from "@mui/icons-material"
import { logout } from '../store/slices/auth.slice.js'

export default function Navbar() {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Users management App
                </Typography>
                {user &&
                    <div style={{ display: 'flex', marginRight: '25px' }}>
                        <Person />
                        <Typography component="div">
                            {user}
                        </Typography>
                    </div>
                }
                <Button color="inherit" onClick={() => {
                    dispatch(logout())
                    navigate("/")
                }}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}