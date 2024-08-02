import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";

// Define Collection (name & schema)
const CARD_COLLECTION_NAME = "cards";
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),

  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional(),

  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _isDeleted: Joi.boolean().default(false),
});
const INVALID_UPDATE_FIELDS = ["id","boardId", "createdAt"];

const validateDataBeforeCreate = async (data) => {
  return await CARD_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};
const createNew = async (data) => {
  try {
    const validData = await validateDataBeforeCreate(data);

    const newAddedCard = {
      ...validData,
      boardId: new ObjectId(String(validData.boardId)),
      columnId: new ObjectId(String(validData.columnId)),
    };

    const createdCard = await GET_DB()
      .collection(CARD_COLLECTION_NAME)
      .insertOne(newAddedCard);
    return createdCard;
  } catch (error) {
    throw new Error(error);
  }
};
const findOneById = async (id) => {
  try {
    console.log(id);
    const idTest = new ObjectId(String(id));
    console.log(idTest);
    const result = await GET_DB().collection(CARD_COLLECTION_NAME).findOne({
      _id: idTest,
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const update = async (cardId, updateData) => {
  try {
    const columnIdTested = new ObjectId(String(cardId));
    Object.keys(updateData).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
        delete updateData[fieldName];
      }
    });
    if (updateData.columnId) updateData.columnId = new ObjectId(updateData.columnId)
    const result = await GET_DB()
      .collection(CARD_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: columnIdTested,
        },
        {
          $set: updateData,
        },
        {
          returnDocument: "after",
        }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const deleteManyByColumnId = async (columnId) => {
  try {
    const idTest = new ObjectId(String(columnId));
    const result = await GET_DB().collection(CARD_COLLECTION_NAME).deleteMany({
      columnId: idTest,
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  update,
  deleteManyByColumnId
};
