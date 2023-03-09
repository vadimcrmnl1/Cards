import React from "react";
import {NavLink} from "react-router-dom";
import {PATH} from "../../utils/routes/Routes";

import {AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import {Button} from "@material-ui/core";
import {useAppSelector} from "../../../app/store";
import {NavbarTemperary} from "../NavbarTemperary/NavbarTemperary";


const settings = ['Profile', 'Logout'];

export const Header = () => {
    const isLoggedId = useAppSelector(state => state.auth.isLoggedIn)

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" color={'default'}>
            <Container maxWidth="xl">
                <Toolbar style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <NavLink to={'/'}>
                        {/*<img src={logo} alt={'logo'}/>*/}
                        <WorkspacesIcon style={{color: 'black'}}/>
                    </NavLink>
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
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    }
                </Toolbar>
            </Container>
            <NavbarTemperary/>
        </AppBar>
    )
}