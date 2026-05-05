const adminAuth = (req, res, next) => {
  console.log("Admin middleware executed");
  const token = "abc";
  const isAdminAuthorized = token === "abc";

  if (!isAdminAuthorized) {
    return res.status(403).send("Unauthorized access");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User middleware executed");
  const token = "abc";
  const isUserAuthorized = token === "abc";

  if (!isUserAuthorized) {
    return res.status(403).send("Unauthorized access");
  } else {
    next();
  }
};



module.exports = { adminAuth, userAuth };