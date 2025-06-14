const errorHandler = async (err, req, res, next) => {
  console.log("in ErrorHandler");
  console.log(err, "code", err.code);

  // MongoDB duplicate key err
  if (err.code === 11000) {
    err.message = "This username already exists, please try again!!!";
  }
  if (err.status) {
    res.status(err.status);
  }
  res.send({ success: false, message: err.message });
};

module.exports = errorHandler;
