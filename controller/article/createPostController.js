import Article from "../../model/article/articleModel.js";

export const createArticle = async (req, res) => {
  try {
    const article = req.body;
    const addedBy = req.user;

    const newArticle = new Article({
      ...article,
      author: addedBy,
    });

    await (await newArticle.save()).populate("author", "_id firstName");

    res.status(201).json({ success: true, article: newArticle });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
