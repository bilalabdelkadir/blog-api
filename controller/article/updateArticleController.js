import Article from "../../model/article/articleModel.js";

export const updateArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const articleUpdates = req.body;
    const userId = req.user.id;

    const article = await Article.findById(articleId);

    if (!article) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }

    if (article.author.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    Object.keys(articleUpdates).forEach((key) => {
      article[key] = articleUpdates[key];
    });

    // save the updated article
    const updatedArticle = await article.save();

    res.status(200).json({ success: true, article: updatedArticle });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
