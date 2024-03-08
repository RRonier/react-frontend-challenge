import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomSelect from "./CustomSelect.jsx";
import {addUser} from "../services/users.js";
import {enqueueSnackbar} from "notistack";
import {useTranslation} from "react-i18next";

// eslint-disable-next-line react/prop-types
export default function UserDialog({ open, handleClose, setUsers }) {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
    })
    const [role, setRole] = useState([])
    const {t} = useTranslation()

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
                        const {data} = await addUser(formValues.name, formValues.email, role)
                        setUsers((prevUsers) => [...prevUsers, data])
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