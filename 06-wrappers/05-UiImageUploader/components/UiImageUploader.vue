<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': isLoading }"
      :style="{ '--bg-url': backgroundUrl }"
      @click="onRemove"
    >
      <span class="image-uploader__text">{{ previewText }}</span>
      <input
        ref="file"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        @change="onChangeFile"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,

  props: {
    preview: {
      type: String,
      default: undefined,
    },

    uploader: {
      type: Function,
      default: undefined,
    },
  },

  emits: ['remove', 'select', 'upload', 'error'],

  data() {
    return {
      isLoading: false,
      image: null,
    };
  },

  computed: {
    backgroundUrl() {
      return this.image ? `url('${this.image}')` : null;
    },

    previewText() {
      if (this.isLoading) {
        return 'Загрузка...';
      }

      return this.image ? 'Удалить изображение' : 'Загрузить изображение';
    },
  },

  created() {
    this.image = this.preview;
  },

  methods: {
    onRemove(e) {
      if (this.image) {
        this.$emit('remove');
        this.image = null;
        this.$refs['file'].value = '';
        e.preventDefault();
      }
    },

    onChangeFile(e) {
      const file = e?.target?.files?.[0];
      const { uploader } = this;

      if (file) {
        this.$emit('select', file);

        if (uploader && typeof uploader === 'function') {
          this.isLoading = true;

          uploader(file)
            .then((response) => {
              this.$emit('upload', response);
            })
            .catch((e) => {
              this.$emit('error', e);
            })
            .finally(() => {
              this.isLoading = false;
              this.$refs['file'].value = '';
            });
        } else {
          this.image = URL.createObjectURL(file);
        }
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
