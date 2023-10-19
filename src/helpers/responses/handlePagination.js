const handlePagination = async (Model, req, res, queries) => {
    try {
      const { page = 1, pageSize = 10, sortField, sortOrder } = req.query;
  
      // Calculate the skip and limit values for database queries
      const skip = (page - 1) * pageSize;
      const limit = parseInt(pageSize);
  
      // Perform the database query with optional sorting
      const query = Model.find(queries)
        .skip(skip)
        .limit(limit);
        console.log(query)
      if (sortField && sortOrder) {
        query.sort({ [sortField]: sortOrder });
      }
  
      const items = await query.exec();
  
      // Calculate the total count of items
      const totalCount = await Model.countDocuments(query);
  
      // Return the results along with metadata
      return {
        items,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / pageSize),
        totalItems: totalCount,
      }
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error for the calling function to handle
    }
  };

module.exports = handlePagination;
