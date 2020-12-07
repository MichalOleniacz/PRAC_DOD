const validateBody = (body, detailedUsageInfoModel, { cb, next }) => {
  console.log(next);

  try {
    const value = detailedUsageInfoModel.validateAsync(body);
    if (next) cb(value, next);
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};

module.exports = validateBody;
