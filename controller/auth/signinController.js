import User from "../../model/user/userModel.js";
import createToken from "../../utils/createToken.js";

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    if (!user) {
      throw Error("Couldn't sign in");
    }
    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      message: "Successfully logged in",
      token,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

export default loginUser;
