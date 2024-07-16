import { StatusCodes } from "http-status-codes";
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatters";
import { cloneDeep } from "lodash";
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

const getDetails = async (boardId) => {
  try {
    console.log("day ne :3", boardId);
    const board = await boardModel.getDetails(boardId);
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
  } catch (error) {
    throw error;
  }
};
export const boardService = {
  createNew,
  getDetails,
};
