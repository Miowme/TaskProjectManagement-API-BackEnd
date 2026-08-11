export const formatJoiErrors = (error) => {
  if (!error?.details) return [];
  return error.details.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
};
