import * as React from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {addPackTC, deletePackTC, updatePackTC} from "./packs-reducer";
import {PacksTable} from "./PacksTable";
import {selectIsLoggedIn} from "../../auth/selectors";
import {Navigate} from 'react-router-dom';
import {PATH} from "../../../common/utils/routes/Routes";
import {AddPackRequestDataType, UpdatePackRequestDataType} from "../table-api";
import {Button} from "@mui/material";
import {useStyles} from "../../styleMU/styleMU";
import s from "./Packs.module.css"
import {PaginationComponent} from "./components/PaginationComponent";

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
        const id = '640f6d55dc68f718b46b2501'
        dispatch(deletePackTC(id))
    }
    const handleUpdatePack = () => {
        const cardPack: UpdatePackRequestDataType = {
            cardsPack: {
                _id: '640f6d7edc68f718b46b2502',
                name: 'First Pack'
            }
        }
        dispatch(updatePackTC(cardPack))
    }
    const styleMU = useStyles();

    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }
    return (
        <div className={s.container}>
            <div className={s.packsHeader}>
                <h3>Packs list</h3>
                <Button className={styleMU.button}
                        onClick={handleAddPack}
                        variant={'contained'}>Add new pack</Button>
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
            </div>
            <div className={s.packsBlock}>
                {/*<SearchComponent/>
            <SortComponent/>
            <FilterComponent/>*/}
            </div>
            <div>
                <PacksTable/>
            </div>
            <PaginationComponent/>

        </div>
    )
}
