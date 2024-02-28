class Router {
  constructor() {}

  init() {
    history.pushState({ page: "home" }, null, "/");
  }

  go(route) {
    history.pushState({ page: route }, null, route);
  }

  back() {
    history.back();
  }
}

export default Router;
