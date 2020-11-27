Vue.createApp({
  data() {
    return {
      // サムネイルの配列
      thumbnails: [
        {
          id: 1,
          src: "https://placehold.jp/300x300.png",
        },
        {
          id: 2,
          src: "https://placehold.jp/3d4070/ffffff/300x300.png",
        },
        {
          id: 3,
          src: "https://placehold.jp/b32020/ffffff/300x300.png",
        },
      ],
    };
  },
}).mount("#app");
