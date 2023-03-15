const name = "My Name Is Khan";
const id = 3;

const tags = name.split(" ");
const queryString =
  tags.map((tag) => `tags_like=${tag}`).join("&") + `&id_ne=${id}`;
