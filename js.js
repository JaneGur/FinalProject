const MOCK_TASKS = [
  {
    id: 1,
    noteTitle: "Изучить паттерн MVC",
    noteDescription: "Изучить паттерн MVC",
    noteColor: "yellow",
    isFavourite: false,
  },
  {
    id: 2,
    noteTitle: "Изучить паттерн MVC",
    noteDescription: "Изучить паттерн MVC",
    noteColor: "green",
    isFavourite: false,
  },
];

// хранение данных, бизнес-логика
const model = {
  notes: [],
  counterOfTask: 0,
  addTask(noteTitle, noteDescription, noteColor) {
    // const note = {
    //   id: new Date().getTime(),
    //   noteTitle: noteTitle,
    //   noteDescription: noteDescription,
    //   noteColor: noteColor,
    //   isFavourite: false,
    // };
    // this.notes.push(note);
    // view.renderNotes(note);
    alert(noteColor);
  },
};
// отображение данных: рендер списка задач, размещение обработчиков событий
const view = {
  init() {
    this.renderNotes({
      noteTitle: "Изучить паттерн MVC",
      noteDescription: "Изучить паттерн MVC",
      noteColor: "blue",
      isFavourite: false,
    });
    const noteEntryBlock = document.querySelector(".note-entry-block");
    const noteNameBlock = document.querySelector(
      "#note-name-block-title-input"
    );
    const noteNameDescription = document.querySelector("#note-name-input");
    const radioYellow = document.querySelector('input[value="yellow"]');
    radioYellow.checked = true;
    const radioGreen = document.querySelector('input[value="green"]');
    const radioBlue = document.querySelector('input[value="blue"]');
    const radioRed = document.querySelector('input[value="red"]');
    const radioPurple = document.querySelector('input[value="purple"]');
    const blockFavoriteNotesCheckBox = document.querySelector(
      ".block-favorite-notes"
    );
    const noteBlockImg = document.querySelector(".notes");

    noteEntryBlock.addEventListener("submit", function (event) {
      event.preventDefault(); // Предотвращаем стандартное поведение формы
      const noteTitle = noteNameBlock.value;
      const noteDescription = noteNameDescription.value;
      let noteColor;
      if (radioYellow.checked) {
        noteColor = radioYellow.value;
      } else if (radioGreen.checked) {
        noteColor = radioGreen.value;
      } else if (radioBlue.checked) {
        noteColor = radioBlue.value;
      } else if (radioRed.checked) {
        noteColor = radioRed.value;
      } else if (radioPurple.checked) {
        noteColor = radioPurple.value;
      }

      controller.addTask(noteTitle, noteDescription, noteColor); // Вызываем метод addTask контроллера

      noteNameBlock.value = ""; // Очищаем поле ввода
      noteNameDescription.value = "";
    });
    noteBlockImg.addEventListener("click", (event) => {
      if (event.target.classList.contains("favourite-note-img")) {
        alert("я нажала картинку с сердечком");
      }
      if (event.target.classList.contains("trash-img")) {
        alert("я нажала картинку с мусором");
      }
    });
    blockFavoriteNotesCheckBox.addEventListener("click", (event) => {
      if (event.target.classList.contains("checkbox")) {
        alert("я нажал чекбокс");
      }
    });
  },
  renderNotes(note) {
    const notes = document.querySelector(".notes");
    const newNote = document.createElement("div");
    newNote.classList.add("new-note");
    const newNoteTitle = document.createElement("div");
    newNoteTitle.classList.add("new-note-title", note.noteColor);
    newNote.append(newNoteTitle);
    const newNoteTitleName = document.createElement("div");
    newNoteTitleName.classList.add("new-note-title-name");
    newNoteTitle.append(newNoteTitleName);
    const newNoteTitleParagraph = document.createElement("p");
    newNoteTitleParagraph.textContent = note.noteTitle;
    const newNoteTitleIconsBlock = document.createElement("div");
    const favouriteNoteImg = document.createElement("img");
    favouriteNoteImg.classList.add("favourite-note-img");
    favouriteNoteImg.src = "assets/heart inactive.png";
    favouriteNoteImg.alt = "Favorite notes";
    const trashImg = document.createElement("img");
    trashImg.classList.add("trash-img");
    trashImg.src = "assets/trash.png";
    trashImg.alt = "Delete note";
    newNoteTitleIconsBlock.append(favouriteNoteImg, trashImg);
    newNoteTitleName.append(newNoteTitleParagraph, newNoteTitleIconsBlock);
    const newNoteDescription = document.createElement("p");
    newNoteDescription.classList.add("new-note-description");
    newNoteDescription.innerHTML = `${note.noteDescription}`;
    newNote.append(newNoteTitle, newNoteDescription);
    notes.append(newNote);
  },

  renderFavouriteNotes(note) {
    const notes = document.querySelector(".notes");
    const newNote = document.createElement("div");
    newNote.classList.add("new-note");
    const newNoteTitle = document.createElement("div");
    newNoteTitle.classList.add("new-note-title", note.noteColor);
    newNote.append(newNoteTitle);
    const newNoteTitleName = document.createElement("div");
    newNoteTitleName.classList.add("new-note-title-name");
    newNoteTitle.append(newNoteTitleName);
    newNoteTitleName.innerHTML = `<p>${note.noteTitle}</p>
                <div>
                  <a href="#"
                    ><img src="assets/heart active.png" alt="Favorite notes"
                  /></a>
                  <a href="#"
                    ><img src="assets/trash.png" alt="Delete note"
                  /></a></div>`;
    const newNoteDescription = document.createElement("p");
    newNoteDescription.classList.add("new-note-description");
    newNoteDescription.innerHTML = `${note.noteDescription}`;
    newNote.append(newNoteTitle, newNoteDescription);
    notes.append(newNote);
  },

  renderEmptyNote() {
    const notes = document.querySelector(".notes");
    const emptyNote = document.createElement("p");
    emptyNote.classList.add("empty-note");
    emptyNote.textContent =
      "У вас ещё нет ни одной заметки. Заполните поля выше и создайте свою первую заметку!";
    notes.append(emptyNote);
  },

  renderFavouriteNoteCheckbox() {
    const container = document.querySelector(".container");
    const blockFavoriteNotes = document.createElement("div");
    blockFavoriteNotes.classList.add("block-favorite-notes");
    blockFavoriteNotes.innerHTML = `<label class="favorite-notes">
            <input
              class="checkbox"
              type="checkbox"
              name="checkbox"
              value="checkbox"
              id="checkbox"
            />
            <span class="favorite-notes-checkbox"
              >Показать только избранные заметки</span
            >
          </label>`;
    container.append(blockFavoriteNotes);
  },

  renderTitleLengthWarning() {
    const mainSection = document.querySelector(".main-section");
    const TitleLengthWarning = document.createElement("div");
    TitleLengthWarning.classList.add("title-length-warning");
    mainSection.append(TitleLengthWarning);
  },
};

// обработка действий пользователя, обновление модели
const controller = {
  addTask(noteTitle, noteDescription, noteColor) {
    model.addTask(noteTitle, noteDescription, noteColor);
  },
};

// view.renderEmptyNote();
view.init();

// Функция инициализации
// function init() {
// view.renderTitleLengthWarning();
//     // здесь может быть код инициализации других модулей
// }
//
// // Вызов функции инициализации при загрузке страницы
// init()
