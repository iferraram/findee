const createErrorObject = (res, error) => res.status(500).json( error);

module.exports = createErrorObject;
