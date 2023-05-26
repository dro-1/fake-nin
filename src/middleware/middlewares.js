const checkTokens = (req, res, next) => {
  let bearerToken = req.get("Authorization");
  if (!bearerToken)
    return res.status(400).send({
      status: "Failed",
      message: "Invalid credentials",
    });

  bearerToken = bearerToken.split(" ");
  if (
    bearerToken[0] != "Bearer" ||
    !bearerToken[1] ||
    bearerToken[1] != process.env.API_KEY
  )
    return res.status(400).send({
      status: "Failed",
      message: "Invalid credentials",
    });

  next();
};

module.exports = {
  checkTokens,
};
