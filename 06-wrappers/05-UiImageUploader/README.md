# UiImageUploader

🔥 _Задача повышенной сложности_\
💼 _Часть проекта_

<!--start_statement-->

Требуется разработать компонент `UiImageUploader` выбора и загрузки изображения:

- Входные параметры компонента:
  - `preview` - ссылка на отображаемое изображение;
  - `uploader` - асинхронная функция загрузки изображения.
- Компонент является обёрткой над `input[type=file]` и должен передавать на него атрибуты (например, `name`).
- Компонент может находиться в трёх основных состояниях:
  1. Пустой (`preview` отсутствует, изображение не выбрано). Отображается текст `"Загрузить изображение"`, а клик
     запускает диалоговое окно выбора файла;
  2. Загрузка (пользователь выбрал изображение и загружает его на сервер через `uploader`). Отображается текст
     `"Загрузка..."`, а элемент с превью изображения имеет класс `image-uploader__preview-loading`;
  3. Заполненный (выбран и загружен файл, либо изначально присутствует `preview`). Изображение есть и отображается на
     превью через установку CSS переменной `--bg-url`, а элемент имеет текст `"Удалить изображение"`.
- Изначально компонент может быть как пустым, так и заполненным, если требуется отобразить уже загруженное ранее
  изображение.
- Компонент может использоваться как для просто выбора файла, так и для его загрузки на сервер.
- При наличии загрузчика `uploader`, после выбора изображения оно должно загружаться на сервер через `uploader`.
- В любом случае после выбора файла порождается событие `select` с выбранным файлом.
- После успешного окончания загрузки порождается событие `upload` с результатом работы загрузчика.
- При неуспешной загрузке изображения порождается событие `upload` с ошибкой загрузчика, а компонент возвращается в
  предыдущее состояние.
- При наличии выбранного изображения по клику удаляется изображение и порождается событие `remove`.

Для отображения выбранного файла используйте
[URL.createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL).

<img src="https://i.imgur.com/4XBodgQ.png" alt="States" style="max-width: 100%">

Примечание: если не сбрасывать значение на `<input>` при удалении кликом, то в нём сохранится последнее выбранное
изображение, и будет сложно выбрать то же изображение заново (`change` не сработает при повторном выборе того же
изображения, которое уже выбрано). Для сброса `<input>` при удалении изображения можно повесить на него `ref` и явно
обращаться к нему для удаления текущего значения.

<img src="https://i.imgur.com/AJJTMWo.gif" alt="Example" />

```smart header="Почему uploader - параметр функция, а не событие?"
Обычно вместо передачи функций в компоненты в них передаются обработчики событий. Часто в таких компонентах `uploader` передаётся тоже, как обработчик события.

Но здесь `uploader` - это не просто обработчик события "начинается загрузка", при котором требуется среагировать на
загрузку, а функция, которую требуется использовать в работе компонента. От её наличия зависит сценарий работы
компонента. Результат её работы используется в работе компонента.
```

<!--end_statement-->

---

### Инструкция

📝 Для решения задачи отредактируйте файл: `components/UiImageUploader.vue`.

🚀 Команда запуска для ручного тестирования: `npm run serve`;\
приложение будет доступно на [http://localhost:8080/06-wrappers/05-UiImageUploader](http://localhost:8080/06-wrappers/05-UiImageUploader).

✅ Доступно автоматическое тестирование: `npm test UiImageUploader`.