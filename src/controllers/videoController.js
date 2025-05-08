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
]


export const trending = (req, res) => res.render("home", {pageTitle: "Home"})
export const watch = (req, res) => {
    const { id } = req.parms;
    const video = videos[id-1];
    return res.render("watch", { pageTitle: `Watching ${video.title}`, video});
}
export const edit = (req, res) => res.send("edit")
export const search = (req, res) => res.send("search")
export const upload = (req, res) => res.send("upload")
export const deleteVideo = (req, res) => res.send("delete video")