const { Schema, model } = require("mongoose");
const handleMongooseError = require("../middlewares/handleMongooseError");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    token: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    banned: {
      type: Boolean,
      default:false
    }
    
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
