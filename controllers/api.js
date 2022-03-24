//requirments for api router functions
const apiFunctions = {};
const User = require("../models/user");

//main router functions
apiFunctions.get_a_user_info = async (req, res) => {
  let { card } = req.params;

  const sendRes = (data) => {
    res.json(data);
  };

  try {
    let user = await User.findOne({ card });

    if (user) {
      let { username, email } = user;

      sendRes({ username, email });
    } else {
      throw Error("user not found");
    }
  } catch ({ message }) {
    sendRes({ error: message });
  }
};
apiFunctions.get_total_user_number = async (req, res) => {
  const sendRes = (data) => {
    res.json(data);
  };

  try {
    let total_user_num = await User.estimatedDocumentCount();

    if (total_user_num) {
      sendRes({ total: total_user_num });
    } else {
      throw Error("can't get the number");
    }
  } catch ({ message }) {
    sendRes({ error: message });
  }
};

//exports
module.exports = apiFunctions;
