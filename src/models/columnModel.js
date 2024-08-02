import Joi from "joi";
import { GET_DB } from "~/config/mongodb";
import { ObjectId } from "mongodb";

import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = "columns";
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),

  cardOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),

  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _isDeleted: Joi.boolean().default(false),
});
const INVALID_UPDATE_FIELDS = ["id","boardId", "createdAt"];

const validateDataBeforeCreate = async (data) => {
  return await COLUMN_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};
const createNew = async (data) => {
  try {
    const validData = await validateDataBeforeCreate(data);

    const newAddedColumn = {
      ...validData,
      boardId: new ObjectId(String(validData.boardId)),
    };

    const createdModel = await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .insertOne(newAddedColumn);
    return createdModel;
  } catch (error) {
    throw new Error(error);
  }
};
const findOneById = async (id) => {
  try {
    console.log(id);
    const idTest = new ObjectId(String(id));
    console.log(idTest);
    const result = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOne({
      _id: idTest,
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
// day cardId vao cuoi cardOrderIds

const pushCardOrderIds = async (card) => {
  try {
    const boardIdTested = new ObjectId(String(card.columnId));
    const cardIdTested = new ObjectId(String(card._id));
    const result = await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: boardIdTested,
        },
        {
          $push: {
            cardOrderIds: cardIdTested,
          },
        },
        {
          returnDocument: "after",
        }
      );
    return result 
  } catch (error) {
    throw new Error(error);
  }
};
const update = async (columnId, updateData) => {
  try {
    const columnIdTested = new ObjectId(String(columnId));
    Object.keys(updateData).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
        delete updateData[fieldName];
      }
    })
    if (updateData.cardOrderIds) {
      updateData.cardOrderIds = updateData.cardOrderIds.map(_id => new ObjectId(String(_id)));
    }
    
    
      
    const result = await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: columnIdTested,
        },
        {
          $set: updateData,
        },
        {
          returnDocument: 'after',
        }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const deleteOneById = async (columnId) => {
  try {
    const idTest = new ObjectId(String(columnId));
    const result = await GET_DB().collection(COLUMN_COLLECTION_NAME).deleteOne({
      _id: idTest,
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  pushCardOrderIds,
  update,
  deleteOneById
};
