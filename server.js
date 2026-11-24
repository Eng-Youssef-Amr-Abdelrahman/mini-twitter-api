const express = require("express");
const app = express();

// middleware: parses JSON body into req.body
app.use(express.json());

// storage: plain JS arrays (no database yet)
const posts = [];
const comments = [];
let nextPostId = 1;
let nextCommentId = 1;

function findPost(id) {
  return posts.find((p) => p.id === Number(id));
}

// ---------- POSTS ----------

// Upload a post
app.post("/posts", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "title and content are required" });
  }

  const post = { id: nextPostId++, title, content };
  posts.push(post);
  res.status(201).json(post);
});

// Read all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Read one post
app.get("/posts/:id", (req, res) => {
  const post = findPost(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

// Edit a post
app.put("/posts/:id", (req, res) => {
  const post = findPost(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  const { title, content } = req.body;
  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;

  res.json(post);
});

// Delete a post (and its comments)
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Post not found" });

  const postId = posts[index].id;
  posts.splice(index, 1);

  // remove that post's comments too
  for (let i = comments.length - 1; i >= 0; i--) {
    if (comments[i].postId === postId) comments.splice(i, 1);
  }

  res.status(204).end();
});

// ---------- COMMENTS ----------

// Add a comment to a post
app.post("/posts/:id/comments", (req, res) => {
  const post = findPost(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: "content is required" });
  }

  const comment = { id: nextCommentId++, postId: post.id, content };
  comments.push(comment);
  res.status(201).json(comment);
});

// Read a post's comments
app.get("/posts/:id/comments", (req, res) => {
  const post = findPost(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  res.json(comments.filter((c) => c.postId === post.id));
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});