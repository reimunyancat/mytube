let videos = [
    {
        title: "first video",
        rating: 5,
        comments: 2,
        createat: "1 second ago",
        views: 1,
        id: 1,
    },
    {
        title: "second video",
        rating: 5,
        comments: 5,
        createat: "1 minute ago",
        views: 1974,
        id: 2,
    },
];


export const trending = (req, res) => res.render("home", { pageTitle: "Home", videos });
export const watch = (req, res) => {
    const { id } = req.params;
    const video = videos[id-1];
    return res.render("watch", { pageTitle: `Watching: ${video.title}`, video });
};
export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id-1];
    return res.render("edit", { pageTitle: `Editing: ${video.title}`, video })
};
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id-1].title = title;
    return res.redirect(`/videos/${id}`);
}
export const search = (req, res) => res.send("search");
export const deleteVideo = (req, res) => res.send("delete video");

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
}

export const postUpload = (req, res) => {
    return res.redirect("/");
}