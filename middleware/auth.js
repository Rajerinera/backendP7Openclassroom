const jwt = require("jsonwebtoken");

// logique de la creation du token

module.exports = (req, res, next) => {
  try {
    //const token = Authorization;
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const id = decodedToken.id;
    if (req.body.id && req.body.id !==  id) {
      throw "user ID non valable";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Requete non authentifiée!"),
    });
  }
};
