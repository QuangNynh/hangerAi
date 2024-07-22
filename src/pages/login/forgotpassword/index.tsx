import { useState } from 'react';
import '../../../style/login.css';
import { useNavigate } from 'react-router';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CircularProgress, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';



const ForgotPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [submit, setSubmit] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordCheck, setPassWordCheck] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmailError("");
        const data = new FormData(event.currentTarget);
        if (passwordCheck == false) {
            const email = data.get('email') as string;
            if (email === "") {
                setEmailError("Please enter your email");
                return;
            }

            if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                setEmailError("Please enter a valid email address");
                return;
            }
            setIsLoading(true);
            // Simulate an API call
            setTimeout(() => {
                setIsLoading(false);
                setPassWordCheck(true);
            }, 2000);
        }
        else {
            const email = data.get('email') as string;
            if (email === "") {
                setEmailError("Please enter your email");
                return;
            }

            if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                setEmailError("Please enter a valid email address");
                return;
            }

            setIsLoading(true);

            // Simulate an API call
            setTimeout(() => {
                setIsLoading(false);
                setSubmit(false);

            }, 2000);
        }
    };

    const handleSubmitReset = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPasswordError("");
        setConfirmPasswordError("");

        const data = new FormData(event.currentTarget);
        const password = data.get('password') as string;
        const confirmPassword = data.get('confirmpassword') as string;



        if (password === "") {
            setPasswordError("Please enter a password");
            return;
        }

        if (password.length < 8) {
            setPasswordError("Password must be 8 characters or longer");
            return;
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            return;
        }
        setIsLoading(true);
        // Simulate an API call
        setTimeout(() => {
            setIsLoading(false);
            if (email && password) {
                navigate('/login');
            } else {
                navigate('/signup');
            }
        }, 2000);
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'linear-gradient(140deg, #EADEDB 0%, #BC70A4 50%, #BFD641 75%)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    </Avatar>
                    <Typography component="h1" variant="h5" align="center">
                        Password recovery
                    </Typography>
                    <Typography component="h1" variant="h5" align="center">
                        Enter your email and we'll email you a password recovery code.
                    </Typography>
                    {submit ? <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!emailError}
                            helperText={emailError}
                        />
                        {(passwordCheck) ? <><TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Code"
                            autoFocus
                            // onChange={(e) => setEmail(e.target.value)}
                            error={!!emailError}
                            helperText={emailError}
                        />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, opacity: isLoading ? 0.8 : 1 }}
                            >
                                {isLoading ? <CircularProgress size={20} color='warning' sx={{ opacity: 2 }} /> : "Reset password"}
                            </Button>
                        </>
                            :
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, opacity: isLoading ? 0.8 : 1 }}
                            >
                                {isLoading ? <CircularProgress size={20} color='warning' sx={{ opacity: 2 }} /> : "Send code"}
                            </Button>
                        }
                    </Box>
                        :
                        <Box component="form" noValidate onSubmit={handleSubmitReset} sx={{ mt: 1 }}>
                            <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={ev => setPassword(ev.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                                <FormHelperText error>{passwordError}</FormHelperText>
                            </FormControl>
                            <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
                                <InputLabel htmlFor="confirmpassword">Confirm password</InputLabel>
                                <OutlinedInput
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={ev => setConfirmPassword(ev.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm password"
                                />
                                <FormHelperText error>{confirmPasswordError}</FormHelperText>
                            </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, opacity: isLoading ? 0.8 : 1 }}
                            >
                                {isLoading ? <CircularProgress size={20} color='warning' sx={{ opacity: 2 }} /> : "Reset password"}
                            </Button>

                        </Box>}
                    <Grid container justifyContent="center" alignItems="center">
                        <Typography>
                            © 2024 All Rights Reserved.{" "}
                            <Link> Privacy Policy</Link>
                        </Typography>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ForgotPassword;
