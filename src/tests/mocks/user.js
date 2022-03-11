const created = {
  "id": 1,
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
};

const info = {
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
};

const invalidInfo = {
  "displayName": "Brett Wiltshire",
  "email": "brett@email",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
};

const stored = {
  dataValues: {
    "id": 1,
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJkaXNwbGF5TmFtZSI6IkJyZXR0IFdpbHRzaGlyZSIsImVtYWlsIjoiYnJldHRAZW1haWwuY29tIiwiaW1hZ2UiOiJodHRwOi8vNC5icC5ibG9nc3BvdC5jb20vX1lBNTBhZFEtN3ZRL1MxZ2ZSXzZ1ZnBJL0FBQUFBQUFBQUFrLzFFckpHZ1JXWkRnL1M0NS9icmV0dC5wbmcifSwiaWF0IjoxNjQ3MDIxNjA0LCJleHAiOjE2NDc2MjY0MDR9.0QESJ4jkV_megbY3kaLrOJJXFt8oW7xukuaFrFUBiGo';

module.exports = {
  created,
  info,
  token,
  stored,
  invalidInfo,
};
