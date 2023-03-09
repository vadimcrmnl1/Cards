import React from "react";
import {NavLink} from "react-router-dom";
import {PATH} from "../../utils/routes/Routes";
import logo from './incubator-logo.png'
import {AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip} from "@mui/material";
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import {Button} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {logoutTC} from "../../../features/auth/auth-reducer";


export const Header = () => {
    const isLoggedId = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = () => {
        dispatch(logoutTC())
    }

    return (
        <AppBar position="static" color={'default'}>
            <Container maxWidth="xl">
                <Toolbar style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <NavLink to={'/'}><img src={logo} alt={'logo'}/> </NavLink>
                    {!isLoggedId
                        ?
                        <div>
                            <NavLink to={PATH.login}>
                                <Button color={'primary'}
                                        style={{borderRadius: '20px'}}
                                        variant={'contained'}
                                >Sign in</Button>
                            </NavLink>

                        </div>
                        :
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>

                            </Menu>
                        </Box>
                    }
                </Toolbar>
            </Container>

        </AppBar>
    )
}