import { Schema, model } from "mongoose";

const BoardSchema = new Schema (
    {
        id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        imgPath: {
            type: String
          },
    },
    {
        timestamps: true,
    }
);

const BoardModel = model( "Board", BoardSchema);

export { BoardModel };