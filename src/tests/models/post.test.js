const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const PostModel = require('../../database/models/post');

describe('O model de Post', () => {
  const Post = PostModel(sequelize, dataTypes);
  const post = new Post();

  describe('possui o nome "Post"', () => {
    checkModelName(Post)('Post');
  });

  describe('possui as propriedades "title", "content", "userId", "published" e "updated"', () => {
    ['title', 'content', 'userId', 'published', 'updated'].forEach(checkPropertyExists(post));
  });
});
