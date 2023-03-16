import React from "react";
import {NavLink} from "react-router-dom";
import logo from './incubator-logo.png'
import {AppBar, Container, Toolbar} from "@mui/material";
import {useAppSelector} from "../../../app/store";
import {HeaderButtonBlock} from "./components/HeaderButtonBlock";
import {HeaderMenuBlock} from "./components/HeaderMenuBlock";
import {selectIsLoggedIn} from "../../../features/auth/selectors";

const toolBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}


export const Header = () => {

    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    return (
        <AppBar position="static" color={'default'}>
            <Container maxWidth="xl">
                <Toolbar style={toolBarStyle}>
                    <NavLink to={'/'}>
                        <img src={logo} alt={'logo'}/>
                    </NavLink>
                    {!isLoggedIn
                        ? <HeaderButtonBlock/>
                        : <HeaderMenuBlock/>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}