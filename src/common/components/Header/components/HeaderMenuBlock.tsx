import React from "react";
import {Avatar, Box, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import {setAppErrorAC} from "../../../../app/actions";
import {logoutTC} from "../../../../features/auth/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {selectIsLoggedIn} from "../../../../features/auth/selectors";

export const HeaderMenuBlock = () => {
    const loginStatus = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
//хендлер висит на кнопке профайл
        if (!loginStatus ) {
            dispatch(setAppErrorAC('You are not authorised'))
        }
        setAnchorElUser(null);
    };
    const handleLogout = () => {
        dispatch(logoutTC())
    }

    return (
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
    )
}