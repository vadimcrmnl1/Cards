import * as React from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {addPackTC, deletePackTC, updatePackTC} from "./packs-reducer";
import {PacksTable} from "./PacksTable";
import {selectIsLoggedIn} from "../../auth/selectors";
import {Navigate} from 'react-router-dom';
import {PATH} from "../../../common/utils/routes/Routes";
import {Button} from "@material-ui/core";
import {AddPackRequestDataType, UpdatePackRequestDataType} from "../table-api";

export const Packs = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    // const packId = useAppSelector(selectCardPacks)
    const handleAddPack = () => {
        const cardPack: AddPackRequestDataType = {
            cardsPack: {
                name: 'Pack Name',
                deckCover: '',
                private: false
            }
        }
        dispatch(addPackTC(cardPack))
    }
    const handleDeletePack = () => {
        const id = '640f4054dc68f718b46b24fc'
        dispatch(deletePackTC(id))
    }
    const handleUpdatePack = () => {
        const cardPack: UpdatePackRequestDataType = {
            cardsPack: {
                _id: '640f4030dc68f718b46b24fb',
                name: 'Changed name Pack'
            }
        }
        dispatch(updatePackTC(cardPack))
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }
    return (
        <div>
            <Button color={'primary'}
                    style={{borderRadius: '20px', margin: '5px'}}
                    variant={'contained'}
                    onClick={handleAddPack}
            >Add pack</Button>
            <Button color={'primary'}
                    style={{borderRadius: '20px', margin: '5px'}}
                    variant={'contained'}
                    onClick={handleDeletePack}
            >Delete pack</Button>
            <Button color={'primary'}
                    style={{borderRadius: '20px', margin: '5px'}}
                    variant={'contained'}
                    onClick={handleUpdatePack}
            >Update pack</Button>
            <PacksTable/>
        </div>
    );
};


