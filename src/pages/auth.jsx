import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { loginService } from '../services/auth';
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate()
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
                .required('The user is required'),
            password: Yup
                .string()
                .max(255)
                .required('Password is required')
        }),
        onSubmit: async (values, helpers) => {
            try {
                let {user, password} = values
                await loginService(user, password);
                navigate("/dashboard", { replace: true, relative: "route" })
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    });

    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    width: 400
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
                    }}>Login</Typography>
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
                                    label="User"
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
                                    label="Password"
                                    name="password"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="password"
                                    value={formik.values.password}
                                />
                            </Stack>
                            {formik.errors.submit && (
                                <Typography
                                    color="error"
                                    sx={{ mt: 3 }}
                                    variant="body2"
                                >
                                    {formik.errors.submit}
                                </Typography>
                            )}
                            <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                type="submit"
                                variant="contained"
                            >
                                Login
                            </Button>
                        </form>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default LoginPage;
