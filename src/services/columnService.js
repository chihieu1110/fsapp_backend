import { boardModel } from "~/models/boardModel";
import { columnModel } from "~/models/columnModel";

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
export const columnService = {
  createNew,
  update,
};
