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
      imageTransitionName: "prev", // 画像のトランジション
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
    // 現在表示中のサムネイルのインデックス番号
    currentThumbnailIndex() {
      const self = this;
      return _.findIndex(self.thumbnails, function (thumb) {
        return thumb.id === self.selectedThumbnailId;
      });
    },
    // NEXTボタンを押した時に表示するサムネイルオブジェクト
    nextThumbnail() {
      const nextIndex = this.currentThumbnailIndex + 1;
      return this.thumbnails[
        nextIndex > this.thumbnails.length - 1 ? 0 : nextIndex
      ];
    },
    // PREVボタンを押した時に表示するサムネイルオブジェクト
    prevThumbnail() {
      const prevIndex = this.currentThumbnailIndex - 1;
      return this.thumbnails[
        prevIndex < 0 ? this.thumbnails.length - 1 : prevIndex
      ];
    },
    // サムネイルをラップしてる要素の高さ
    containerStyle() {
      return {
        height: this.thumbnailHeight + "px",
      };
    },
  },
  methods: {
    // モーダルを開く
    openModal(thumb) {
      // (thumb)でクリックしたサムネイル情報を受け取れる
      this.isVisible = true;
      this.selectedThumbnailId = thumb.id;
    },
    // オーダルを閉じる
    closeModal() {
      this.isVisible = false;
      this.selectedThumbnailId = undefined;
    },
    onClickPrev() {
      this.selectedThumbnailId = this.prevThumbnail.id;
    },
    onClickNext() {
      this.selectedThumbnailId = this.nextThumbnail.id;
    },
    onLoad(event) {
      this.thumbnailHeight =
        event.target.naturalHeight > 300 ? 300 : event.target.naturalHeight;
      this.isThumbnailLoaded = true;
    },
  },
}).mount("#app");
