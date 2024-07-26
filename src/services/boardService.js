import { StatusCodes } from "http-status-codes";
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatters";
import { cloneDeep } from "lodash";
import { columnModel } from "~/models/columnModel";
import { cardModel } from "~/models/cardModel";
const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };
    const createdBoard = await boardModel.createNew(newBoard);
    console.log(createdBoard);
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);
    console.log(getNewBoard);
    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

const getDetails = async (boardId, reqBody) => {
  try {
  const board=  await boardModel.getDetails(boardId)
  if (!board) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Board Not Found");
  }
  const responseBoard = cloneDeep(board);
  // Dua card ve column cua no
  responseBoard.columns.forEach((column) => {
    column.cards = responseBoard.cards.filter(
      (card) => card.columnId.toString() === column._id.toString()
    );
  });
  delete responseBoard.cards;
    return responseBoard;
  } catch {
 throw error;
  }
};
const update = async (boardId,reqBody) => {
  try {
  
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateData);
    return updatedBoard
  } catch (error) {
    throw error;
  }
};
const relocateCardToColumn = async (reqBody) => {
  try {
    await columnModel.update(reqBody.previousColumnId, {
      cardOrderIds: reqBody.previousCardOrderIds,
      updatedAt: Date.now()
    });
 
    await columnModel.update(reqBody.destinationColumnId, {
      cardOrderIds: reqBody.followingCardOrderIds,
      updatedAt: Date.now()
    });


    await cardModel.update(reqBody.activeCardId,{
      
      columnId: reqBody.destinationColumnId,
    })
    return {updateResult:'Succeed'}
  } catch (error) {
    throw error;
  }
};
export const boardService = {
  createNew,
  getDetails,
  update,
  relocateCardToColumn
};
