class Router {
  constructor() {}

  init() {
    history.pushState({ page: "home" }, null, "/");
  }
}

export default Router;
