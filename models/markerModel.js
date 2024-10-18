const { Schema, model } = require("mongoose");
const handleMongooseError = require("../middlewares/handleMongooseError");
const { REGIONS } = require("../constants");


const markerSchema = new Schema(
  {
    coordinate: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    description: {
      type: String,
      required: true,
      minlength: [5, "min length 5 symbols"],
      maxlength: [50, "max length 50 symbols"],
    },
    region: {
      type: String,
      enum: REGIONS,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    expireAt: { type: Date, required: true },
  },
  { versionKey: false, timestamps: true }
);
markerSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
markerSchema.post("save", handleMongooseError);

const Marker = model("markers", markerSchema);

module.exports = Marker;
