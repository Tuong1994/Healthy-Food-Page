class RequestManager {
  private controllers: Map<string, AbortController> = new Map();

  create(key: string): AbortController {
    // Hủy request cũ nếu tồn tại
    this.abort(key);

    const controller = new AbortController();
    this.controllers.set(key, controller);

    return controller;
  }

  abort(key: string) {
    const controller = this.controllers.get(key);
    if (controller) {
      controller.abort();
      this.controllers.delete(key);
    }
  }

  abortAll() {
    this.controllers.forEach((c) => c.abort());
    this.controllers.clear();
  }
}

export const requestManager = new RequestManager();
