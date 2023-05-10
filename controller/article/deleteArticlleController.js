import Article from "../../model/article/articleModel.js";

// Delete article (requires auth)
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const article = await Article.findOne({ _id: id, author: userId });

    if (!article) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }

    await Article.deleteOne({ _id: article._id });

    res
      .status(200)
      .json({ success: true, message: "Article deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export default deleteArticle;
