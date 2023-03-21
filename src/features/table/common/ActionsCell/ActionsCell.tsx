import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { selectUserId } from "../../../profile/selectors";
import { TeacherIcon } from "../icons/TeacherIcon";
import { EditIcon } from "../icons/EditIcon";
import { TrashIcon } from "../icons/TrashIcon";
import s from "./ActionsCell.module.css";
import {
  deleteCardTC,
  getCardsTC,
  updateCardTC,
} from "../../Cards/cards-reducer";
import { deletePackTC, updatePackTC } from "../../Packs/packs-reducer";
import {
  CardPacksType,
  CardsType,
  UpdateCardRequestDataType,
  UpdatePackRequestDataType,
} from "../../table-api";
import { selectIsAppMakeRequest } from "../../../../app/selectors";
import { PATH } from "../../../../common/utils/routes/Routes";
import { NavLink } from "react-router-dom";

import {
  setCardsAC,
  setCardsPackIdAC,
  setCardsPackNameAC,
  setCardsPackUserIdAC,
} from "../../Cards/actions";

type ActionsCellPropsType = {
  packOwnerId: string;
  packs?: boolean;
  itemId: string;
  packName?: string;
};
export const ActionsCell: React.FC<ActionsCellPropsType> = ({
  packOwnerId,
  packs,
  itemId,
  packName,
}) => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);
  const isAppMakeRequest = useAppSelector(selectIsAppMakeRequest);

  // Это заготовка для 3 недели =======***=======
  // const [editModalOpen, setEditModalOpen] = useState(false)
  // const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  //
  // const handleEdit = () => {
  //     setEditModalOpen(editModalOpen => !editModalOpen)
  // }
  // const handleDelete = () => {
  //     setDeleteModalOpen(deleteModalOpen => !deleteModalOpen)
  // }
  // Это заготовка для 3 недели =======***=======

  const handleDeleteCard = () => {
    const action = packs ? deletePackTC(itemId) : deleteCardTC(itemId);
    dispatch(action);
  };
  const handleUpdateCard = () => {
    const time = new Intl.DateTimeFormat("ru", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date());

    const cardPack: UpdatePackRequestDataType = {
      cardsPack: {
        _id: itemId,
        name: "Name updated " + time,
      },
    };
    const data: UpdateCardRequestDataType = {
      card: {
        _id: itemId,
        question: "How do i become a developer? " + time,
      },
    };
    const action = packs ? updatePackTC(cardPack) : updateCardTC(data);
    dispatch(action);
  };
  const handleLinkToCards = () => {
    dispatch(setCardsPackIdAC(itemId));
    dispatch(setCardsPackNameAC(packName as string));
    //dispatch(getCardsTC());
  };
  return (
    <div className={s.cell}>
      {packs && (
        <NavLink to={PATH.learn} onClick={handleLinkToCards}>
          <TeacherIcon />
        </NavLink>
        /*<button onClick={handleLearn}>
          <TeacherIcon />
        </button>*/
      )}
      {packOwnerId === userId && (
        <div>
          <button onClick={handleUpdateCard} disabled={isAppMakeRequest}>
            <EditIcon />
          </button>
          <button onClick={handleDeleteCard} disabled={isAppMakeRequest}>
            <TrashIcon />
          </button>
        </div>
      )}
    </div>
  );
};
