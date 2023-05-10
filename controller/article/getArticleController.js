import Article from "../../model/article/articleModel.js";

const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findById(id).populate("author", "firstName");

    if (!article) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }

    res.status(200).json({ success: true, article });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export default getArticleById;
