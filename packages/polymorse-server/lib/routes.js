const handlers = require(`./handlers`);
const IDS = require(`./ids`);

module.exports = {

    renderPage: {
        // Render a page
        route: `/page/:pageId`,
        handler: handlers.RenderPage,
        view: IDS.VIEW_PAGE,
        requireAuth: true,
    },

    renderHome: {
        // Render home
        route: `/`,
        handler: handlers.RenderPage,
        view: IDS.VIEW_INDEX,
        requireAuth: true,
    },

    renderAdmin: {
        // Render admin
        route: `/admin`,
        handler: handlers.RenderPage,
        view: IDS.VIEW_ADMIN,
        requireAuth: true,
    },

    renderCompose: {
        // Render compose
        route: `/compose`,
        handler: handlers.RenderPage,
        view: IDS.VIEW_PAGE_EDITOR,
        requireAuth: true,
    },

};