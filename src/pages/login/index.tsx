import { useState } from 'react';
import '../../style/login.css';
import { useNavigate } from 'react-router';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import CircularProgress from '@mui/material/CircularProgress';
import { Opacity } from '@mui/icons-material';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleFacebook = () => {
        console.log("facebook");
    };

    const handleGoogle = () => {
        console.log("gg");
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmailError("");
        setPasswordError("");

        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        console.log(email);
        console.log(password);

        if (email === "") {
            setEmailError("Please enter your email");
            return;
        }

        if (password === "") {
            setPasswordError("Please enter a password");
            return;
        }

        if (password.length < 8) {
            setPasswordError("Password must be 8 characters or longer");
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
            if (email && password) {
                navigate('/dashboard/home');
            } else {
                navigate('/login');
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
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 , opacity: isLoading ? 0.8 : 1}}
                        >
                            {isLoading ? <CircularProgress size={20} color='warning' sx={{opacity:2}}/> : "Sign In"}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="login/forgotpassword" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Typography align="center" marginTop={3}>
                            --- Or sign in with ---
                        </Typography>
                        <Grid container justifyContent="center" alignItems="center" padding={2} gap={2}>
                            <FaFacebook color='#1976D2' size={33} style={{ cursor: "pointer" }} onClick={handleFacebook} />
                            <FcGoogle size={33} style={{ cursor: "pointer" }} onClick={handleGoogle} />
                        </Grid>
                        <Grid container justifyContent="center" alignItems="center">
                            <Typography>
                                © 2024 All Rights Reserved.{" "}
                                <Link> Privacy Policy</Link>
                            </Typography>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
