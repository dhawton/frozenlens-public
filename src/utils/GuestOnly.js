import store from "../store";

export default (to, from, next) => {
  if (store.getters.user === undefined) {
    next();
  } else {
    next({
      path: "/"
    });
  }
};
