const CATEGORY_ID = "categoryId";
const POST_ID = "postId";
const USER_ID = "userId";
const POST = "post";

const forumSession = {
  category: {
    saveId(categoryId) {
      sessionStorage.setItem(CATEGORY_ID, categoryId);
    },
    getId() {
      return sessionStorage.getItem(CATEGORY_ID);
    },
  },
  post: {
    saveId(postId) {
      sessionStorage.setItem(POST_ID, postId);
    },
    getId() {
      return sessionStorage.getItem(POST_ID);
    },
    // savePost(post) {
    //   sessionStorage.setItem(POST, post);
    // },
    // getPost() {
    //   return sessionStorage.getItem(POST);
    // },
  },
  user: {
    saveId(userId) {
      sessionStorage.setItem(USER_ID, userId);
    },
    getId() {
      return sessionStorage.getItem(USER_ID);
    },
  },
};

export { forumSession };
