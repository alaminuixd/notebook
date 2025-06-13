const rateLimiter = async (req, res, next) => {
  console.log("rate limiter");
  next();
};
export default rateLimiter;
