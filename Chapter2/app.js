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
      selectedThumbnailId: undefined, // 選択したサムネイルID
      isVisible: false, // 表示状態
      thumbnailHeight: 0, // モーダル内のサムネイルの高さ
      isThumbnailLoaded: false, // サムネイルが読み込み完了したかどうか
    };
  },
  watch: {
    // サムネイルが選択されたらサムネイルの読み込み状態を読み込みにする
    selectedThumbnailId() {
      this.isThumbnailLoaded = false;
    },
  },
  computed: {
    // 現在表示中のサムネイルオブジェクト
    currentThumbnail() {
      const self = this;
      return _.find(self.thumbnails, function (thumb) {
        return thumb.id === self.selectedThumbnailId;
      });
    },
    // サムネイルをラップしてる要素の高さ
    containerStyle() {
      return {
        height: this.thumbnailHeight + "px",
      };
    },
  },
  methods: {
    openModal(thumb) {
      // (thumb)でクリックしたサムネイル情報を受け取れる
      this.isVisible = true;
      this.selectedThumbnailId = thumb.id;
    },
    onLoad(event) {
      this.thumbnailHeight =
        event.target.naturalHeight > 300 ? 300 : event.target.naturalHeight;
      this.isThumbnailLoaded = true;
    },
  },
}).mount("#app");
