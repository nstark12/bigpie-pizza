import bcrypt from "bcrypt";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: (pass) => {
        if (!pass.length || pass.length < 5) {
          new Error("Password must be at least 5 characters");
        }
      },
    },
  },
  { timestamps: true }
);

UserSchema.post("validate", function (user) {
  const notHashedPassword = user.password;
  const saltRounds = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(notHashedPassword, saltRounds);
});

export const User = models?.User || model("User", UserSchema);