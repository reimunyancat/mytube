export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "join" });
};
export const postJoin = (req, res) => {
  res.render("join", { pageTitle: "join" });
};
export const edit = (req, res) => res.send("edit");
export const remove = (req, res) => res.send("remove");
export const login = (req, res) => res.send("login");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see");
