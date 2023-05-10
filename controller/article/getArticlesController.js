import Article from "../../model/article/articleModel.js";

// Get articles with pagination and search
const getArticles = async (req, res) => {
  try {
    // Set default limit and page values
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    // Get search query and category query
    const searchQuery = req.query.search;
    const categoryQuery = req.query.category;

    // Set default sort order and direction
    const sortField = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "desc";

    // Build filter object based on search and category queries
    const filter = {};
    if (searchQuery) {
      filter["$text"] = { $search: searchQuery };
    }
    if (categoryQuery) {
      filter["category"] = categoryQuery;
    }

    // Get total count of articles matching the filter
    const totalCount = await Article.countDocuments(filter);

    // Calculate skip value based on limit and page values
    const skip = (page - 1) * limit;

    // Get articles based on filter, skip, limit, and sort values
    const articles = await Article.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ [sortField]: sortOrder });

    res.status(200).json({
      success: true,
      articles,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export default getArticles;
