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
  addNote(noteTitle, noteDescription, noteColor) {
    const note = {
      id: new Date().getTime(),
      noteTitle: noteTitle,
      noteDescription: noteDescription,
      noteColor: noteColor,
      isFavourite: false,
    };
    this.notes.push(note);
    view.renderNotes(note);
    // alert(noteColor);
  },
  addTooltipError() {
    view.TooltipErrorView();
  },
};
// отображение данных: рендер списка задач, размещение обработчиков событий
const view = {
  init() {
    // this.renderNotes({
    //   noteTitle:
    //     "Изучить паттерн MVCИзучить паттерн MVCИзучить паттерн MVCИзучить паттерн MVCИзучить паттерн MVCИзучить паттерн MVCИзучить паттерн MVCИзучить паттерн MVC",
    //   noteDescription: "Изучить паттерн MVC",
    //   noteColor: "blue",
    //   isFavourite: false,
    // });
    // this.renderEmptyNote();
    // this.renderFavouriteNoteCheckbox();
    this.renderTooltipError();
    this.renderTooltipNoteisDelete();
    this.renderTooltipNoteisAdded();

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

      controller.addNote(noteTitle, noteDescription, noteColor);

      noteNameBlock.value = ""; // Очищаем поле ввода
      noteNameDescription.value = "";
    });
    noteBlockImg.addEventListener("click", (event) => {
      if (event.target.classList.contains("favourite-note-img")) {
        const favouriteNoteImg = document.querySelector(".favourite-note-img");
        alert("я нажала картинку с сердечком");
        if ((favouriteNoteImg.src = "assets/heart inactive.png")) {
          favouriteNoteImg.src = "assets/heart active.png";
        }
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
    newNoteDescription.textContent = note.noteDescription;
    newNote.append(newNoteTitle, newNoteDescription);
    notes.prepend(newNote);
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
    emptyNote.append(notes);
  },

  renderFavouriteNoteCheckbox() {
    const noteEntryBlock = document.querySelector(".note-entry-block");
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
    noteEntryBlock.after(blockFavoriteNotes);
  },

  renderTooltipError() {
    const TooltipError = document.createElement("div");
    TooltipError.classList.add("tooltip", "tooltip-error", "invisible");
    const noteEntryBlock = document.querySelector(".note-entry-block");
    const TooltipErrorMessage = document.createElement("span");
    TooltipErrorMessage.textContent =
      "Максимальная длина заголовка - 50 символов";
    const TooltipErrorIcon = document.createElement("img");
    TooltipErrorIcon.src = "assets/warning.png";
    TooltipError.append(TooltipErrorIcon, TooltipErrorMessage);
    noteEntryBlock.after(TooltipError);
  },

  renderTooltipNoteisAdded() {
    const TooltipNoteisAdded = document.createElement("div");
    TooltipNoteisAdded.classList.add(
      "tooltip",
      "tooltip-note-is-added",
      "invisible"
    );
    const noteEntryBlock = document.querySelector(".note-entry-block");
    const TooltipNoteisAddedMessage = document.createElement("span");
    TooltipNoteisAddedMessage.textContent = "Заметка добавлена";
    const TooltipNoteisAddedIcon = document.createElement("img");
    TooltipNoteisAddedIcon.src = "assets/Done.png";
    TooltipNoteisAdded.append(
      TooltipNoteisAddedIcon,
      TooltipNoteisAddedMessage
    );
    noteEntryBlock.after(TooltipNoteisAdded);
  },

  renderTooltipNoteisDelete() {
    const TooltipNoteisDelete = document.createElement("div");
    TooltipNoteisDelete.classList.add(
      "tooltip",
      "tooltip-note-is-delete",
      "invisible"
    );
    const noteEntryBlock = document.querySelector(".note-entry-block");
    const TooltipNoteisDeleteMessage = document.createElement("span");
    TooltipNoteisDeleteMessage.textContent = "Заметка удалена!";
    const TooltipNoteisDeleteIcon = document.createElement("img");
    TooltipNoteisDeleteIcon.src = "assets/cancel.png";
    TooltipNoteisDelete.append(
      TooltipNoteisDeleteIcon,
      TooltipNoteisDeleteMessage
    );
    noteEntryBlock.after(TooltipNoteisDelete);
  },

  TooltipErrorView() {
    const tooltipError = document.querySelector(".tooltip-error");
    tooltipError.classList.toggle("invisible");
    setTimeout(() => {
      tooltipError.classList.toggle("invisible");
    }, 3000);
  },

  TooltipNoteisAddView() {
    const TooltipNoteisAdd = document.querySelector(".tooltip-note-is-added");
    TooltipNoteisAdd.classList.toggle("invisible");
    setTimeout(() => {
      TooltipNoteisAdd.classList.toggle("invisible");
    }, 3000);
  },

  TooltipNoteisDeleteView() {
    const TooltipNoteisDelete = document.querySelector(
      ".tooltip-note-is-delete"
    );
    TooltipNoteisDelete.classList.toggle("invisible");
    setTimeout(() => {
      TooltipNoteisDelete.classList.toggle("invisible");
    }, 3000);
  },
};

// обработка действий пользователя, обновление модели
const controller = {
  addNote(noteTitle, noteDescription, noteColor) {
    String(noteTitle).length > 50
      ? model.addTooltipError()
      : model.addNote(noteTitle, noteDescription, noteColor);
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
