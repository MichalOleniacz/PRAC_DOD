const validateBody = (body, model, { cb, next }) => {
  console.log(next);

  const { error } = model.validate(body);
  if (error) {
    console.log(error);
    return;
  }

  cb(body, next);
};

module.exports = validateBody;
