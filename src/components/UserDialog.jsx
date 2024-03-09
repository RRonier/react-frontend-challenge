import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomSelect from "./CustomSelect.jsx";
import {enqueueSnackbar} from "notistack";
import {useTranslation} from "react-i18next";
import {createUser} from "../store/slices/users.slice.js";
import {useDispatch} from "react-redux";

// eslint-disable-next-line react/prop-types
export default function UserDialog({ open, handleClose }) {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
    })
    const [role, setRole] = useState([])
    const {t} = useTranslation()
    const dispatch = useDispatch()

    const handleChangeValues = (event) => {
        let { name, value } = event.target
        setFormValues((state) => ({
            ...state,
            [name]: value,
        }))
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setRole(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => {
                        event.preventDefault();
                        dispatch(createUser({name: formValues.name, email: formValues.email, roles: role}))
                        enqueueSnackbar(t('new_user_added'))
                        handleClose();
                    },
                }}
            >
                <DialogTitle>{t('add_new_user')}</DialogTitle>
                <DialogContent sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <DialogContentText>
                        {t('')}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label={t('user')}
                        type="text"
                        size="small"
                        variant="outlined"
                        value={formValues.name}
                        onChange={handleChangeValues}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        label={t('email')}
                        type="email"
                        size="small"
                        variant="outlined"
                        value={formValues.email}
                        onChange={handleChangeValues}
                    />
                    <CustomSelect handleChange={handleChange} userRole={role}/>
                </DialogContent>
                <DialogActions sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '0 15px'
                }}>
                    <Button variant="outlined" onClick={handleClose}>{t('cancel')}</Button>
                    <Button variant="outlined" type="submit">{t('add_user')}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}