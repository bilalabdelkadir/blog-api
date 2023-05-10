import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 2,
      max: 30,
    },
    lastName: {
      type: String,
      min: 2,
      max: 30,
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
      lowercase: true,
      min: 2,
      max: 50,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      validator: [validator.isStrongPassword, "please enter strong password"],
      minLength: [7, "You password should be at least 7 character"],
      select: false,
    },
    resetPasswordCode: {
      type: String,
      default: "",
    },
    resetPasswordCodeExpiration: {
      type: Date,
      default: null,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
    },
    verificationTokenExpiration: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// register user
userSchema.statics.register = async function (
  firstName,
  lastName,
  email,
  password
) {
  // check if email password
  if (!firstName || !lastName || !email || !password) {
    throw new Error("Please provide required info");
  }

  // check if user already exists with email
  const exist = await this.findOne({ email });
  if (exist) {
    if (exist.email === email) {
      throw new Error("An account with this email already exists");
    } else {
      throw new Error("An account with this phone number already exists");
    }
  }

  // check if email is valid using validator
  if (!validator.isEmail(email)) {
    throw new Error("Please provide a valid email");
  }

  // check if password is strong password
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password should be at least 8 characters long and should contain at least one uppercase letter, one lowercase letter, one number and one special character"
    );
  }

  // create salt for password
  const salt = await bcrypt.genSalt(10);
  // hash password
  const hashedPassword = await bcrypt.hash(password, salt);

  // create new user
  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  // return user
  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
