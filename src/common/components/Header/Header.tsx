import React from "react";
import {NavLink} from "react-router-dom";
import logo from './incubator-logo.png'
import {AppBar, Container, Toolbar} from "@mui/material";
import {useAppSelector} from "../../../app/store";
import {HeaderButtonBlock} from "./components/HeaderButtonBlock";
import {HeaderMenuBlock} from "./components/HeaderMenuBlock";


export const Header = () => {
    const loginStatus = useAppSelector(state => state.auth.isLoggedIn)

    return (
        <AppBar position="static" color={'default'}>
            <Container maxWidth="xl">
                <Toolbar style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <NavLink to={'/'}><img src={logo} alt={'logo'}/> </NavLink>
                    {!loginStatus
                        ?
                        <HeaderButtonBlock/>
                        :
                        <HeaderMenuBlock/>
                    }
                </Toolbar>
            </Container>

        </AppBar>
    )
}