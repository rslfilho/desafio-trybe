const created = {
  "updated": "2022-03-13T12:46:13.989Z",
  "id": 3,
  "title": "Título",
  "content": "Conteúdo",
  "userId": 4
};

const createReturn = {
  "title": "Título",
  "content": "Conteúdo",
  "userId": 4
};

const stored = {
  dataValues: {
    "updated": "2022-03-13T12:46:13.989Z",
    "id": 3,
    "title": "Título",
    "content": "Conteúdo",
    "userId": 4
  },
};

const bodyInfo = {
  "title": "Título",
  "content": "Conteúdo",
};

const invalidBodyInfo = {
  "content": "Conteúdo",
};

const infoWithUserId = {
  "title": "Título",
  "content": "Conteúdo",
  "userId": 4,
};

const postList = [
  {
    "title": "Título 1",
    "content": "Conteúdo 1",
  },
  {
    "title": "Título 2",
    "content": "Conteúdo 2",
  },
  {
    "title": "Título 3",
    "content": "Conteúdo 3",
  },
];

const toUpdate = {
  "title": "Título atualizado",
  "content": "Conteúdo atualizado",
};

const updated = {
  "userId": 1,
  "title": "Título atualizado",
  "content": "Conteúdo atualizado",
};

module.exports = {
  created,
  stored,
  bodyInfo,
  infoWithUserId,
  invalidBodyInfo,
  postList,
  createReturn,
  toUpdate,
  updated,
};
