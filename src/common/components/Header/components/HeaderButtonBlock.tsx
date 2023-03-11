import React from "react";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../utils/routes/Routes";
import {Button} from "@material-ui/core";

export const HeaderButtonBlock = () => {
    return (
        <div>
            <NavLink to={PATH.login}>
                <Button color={'primary'}
                        style={{borderRadius: '20px'}}
                        variant={'contained'}
                >Sign in</Button>
            </NavLink>

        </div>
    )
}