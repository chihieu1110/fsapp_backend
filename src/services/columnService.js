import { StatusCodes } from "http-status-codes";
import { boardModel } from "~/models/boardModel";
import { cardModel } from "~/models/cardModel";
import { columnModel } from "~/models/columnModel";
import ApiError from "~/utils/ApiError";

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody,
    };
    const createdColumn = await columnModel.createNew(newColumn);
    const getNewColumn = await columnModel.findOneById(
      createdColumn.insertedId
    );
    if (getNewColumn) {
      // xu ly data trc khi tra data ve
      getNewColumn.cards = [];
      // update columnsOrderIds in collection boards
      await boardModel.pushColumnOrderIds(getNewColumn);
    }
    return getNewColumn;
  } catch (error) {
    throw error;
  }
};
const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    };
    const updatedColumn = await columnModel.update(columnId, updateData);
    return updatedColumn;
  } catch (error) {
    throw error;
  }
};
const deleteItem = async (columnId) => {
  try {
    const destinationColumn = await columnModel.findOneById(columnId);
    if (!destinationColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Column Not Found");
    }

    await columnModel.deleteOneById(columnId);
    await cardModel.deleteManyByColumnId(columnId);
    // xoa columnId
    await boardModel.extractColumnOrderIds(destinationColumn);
    return { deleteResult: "Deleted Successfully!" };
  } catch (error) {
    throw error;
  }
};
export const columnService = {
  createNew,
  update,
  deleteItem,
};
