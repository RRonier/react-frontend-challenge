import {useEffect, useState} from "react";
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
import {useFormik} from "formik";
import * as Yup from "yup";
import {Typography} from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function UserDialog({ open, handleClose }) {
    const {t} = useTranslation()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            roles: [],
            submit: null
        },
        validateOnChange: false, // Don't validate on change
        validationSchema: Yup.object({
            name: Yup
                .string()
                .max(255)
                .required(t('userRequiredError')),
            email: Yup
                .string()
                .email(t("valid_email_error"))
                .required(t('emailRequiredError')),
            roles: Yup.array()
                .min(1, t("required_role_error"))
                .required(t("required_role_error"))
        }),
        onSubmit: async (values, helpers) => {
            try {
                dispatch(createUser({name: values.name, email: values.email, roles: values.roles}))
                // helpers.validateForm(values)
                enqueueSnackbar(t('new_user_added'))
                handleClose();
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: t('error_on_submit') });
                helpers.setSubmitting(false);
            }
        }
    });

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (e) => {
                        formik.handleSubmit()
                        e.preventDefault()
                    }
                }}
            >
                <DialogTitle>{t('add_new_user')}</DialogTitle>
                <DialogContent sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                        <TextField
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label={t('user')}
                            type="text"
                            size="small"
                            variant="outlined"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.name && formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="email"
                            name="email"
                            label={t('email')}
                            type="email"
                            size="small"
                            variant="outlined"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.email && formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            onBlur={formik.handleBlur}
                        />
                        <CustomSelect
                            name="roles"
                            handleChange={formik.handleChange}
                            value={formik.values.roles}
                            onError={!!(formik.touched.roles && formik.errors.roles)}
                            helperText={formik.touched.roles && formik.errors.roles}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.submit && (
                            <Typography
                                color="error"
                                sx={{ mt: 3 }}
                                variant="body2"
                            >
                                {formik.errors.submit}
                            </Typography>
                        )}
                </DialogContent>
                <DialogActions sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '0 15px 10px'
                }}>
                    <Button variant="outlined" onClick={handleClose}>{t('cancel')}</Button>
                    <Button variant="outlined" type="submit">{t('add_user')}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}