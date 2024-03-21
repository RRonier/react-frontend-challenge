import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/auth.slice.js';

const LoginPage = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const dispatch = useDispatch();
    const { error, loading } = useSelector(state => state.auth)

    const formik = useFormik({
        initialValues: {
            user: '',
            password: '',
            submit: null
        },
        validationSchema: Yup.object({
            user: Yup
                .string()
                .max(255)
                .required(t('userRequiredError')),
            password: Yup
                .string()
                .max(255)
                .required(t('passwordRequiredError'))
        }),
        onSubmit: async (values, helpers) => {
            try {
                dispatch(login(values))
                    .then(({ payload }) => {
                        if (payload) navigate("/dashboard")
                    },(error) => console.log(error))
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err });
                helpers.setSubmitting(false);
            }
        }
    });

    return (
        <Box
            sx={{
                backgroundColor: 'background.paper',
                flex: '1 1 auto',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                width: 400,
                margin: '0 auto'
            }}
        >
            <Box
                sx={{
                    maxWidth: 700,
                    px: 3,
                    py: '100px',
                    width: '100%'
                }}
            >
                <Typography variant='h4' sx={{
                    color: 'black',
                }}>{t('login')}</Typography>
                <div>
                    <Stack
                        spacing={1}
                        sx={{ mb: 3 }}
                    >
                        <Typography variant="h4">
                            Login
                        </Typography>
                    </Stack>
                    <form
                        noValidate
                        onSubmit={formik.handleSubmit}
                    >
                        <Stack spacing={3}>
                            <TextField
                                error={!!(formik.touched.user && formik.errors.user)}
                                fullWidth
                                helperText={formik.touched.user && formik.errors.user}
                                label={t('userLabel')}
                                name="user"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.user}
                            />
                            <TextField
                                error={!!(formik.touched.password && formik.errors.password)}
                                fullWidth
                                helperText={formik.touched.password && formik.errors.password}
                                label={t('passwordLabel')}
                                name="password"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="password"
                                value={formik.values.password}
                            />
                        </Stack>
                        {error && (
                            <Typography
                                color="error"
                                sx={{ mt: 2 }}
                                variant="body2"
                            >
                                {error}
                            </Typography>
                        )}
                        <Button
                            fullWidth
                            size="large"
                            sx={{ mt: 2 }}
                            type="submit"
                            variant="contained"
                        >
                            {loading ? t("loading") : t('login')}
                        </Button>
                    </form>
                </div>
            </Box>
        </Box>
    );
};

export default LoginPage;
