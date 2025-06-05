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
    if (this.counterOfTask === 0) {
      view.renderFavouriteNoteCheckbox();
      view.EmptyNoteView();
    }
    this.counterOfTask += 1;
    this.notes.push(note);
    view.renderNotes(note);
    view.renderQuantityofNotes(this.counterOfTask);
    view.TooltipNoteisAddView();
  },

  addTooltipError() {
    view.TooltipErrorView();
  },
  addTooltipErrorFieldEmpty() {
    view.TooltipErrorFieldEmptyView();
  },
  addTooltipNoteisAdd() {
    view.TooltipNoteisAddView();
  },
  addTooltipNoteisDelete() {
    view.TooltipNoteisDeleteView();
  },

  addFavouriteNote(noteId) {
    this.notes = this.notes.map((item) => {
      if (+item.id == +noteId) {
        item.isFavourite = !item.isFavourite;
        view.favouriteNoteView(item);
      }
      return item;
    });
  },
  deleteNote(noteId) {
    this.counterOfTask -= 1;
    this.notes.forEach((item) => {
      if (+item.id == +noteId) {
        alert(noteId);
        view.deleteNote(item);
      }
      return item;
    });
    view.renderQuantityofNotes(this.counterOfTask);
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
    this.renderEmptyNote();
    this.renderTooltipError();
    this.renderTooltipNoteisDelete();
    this.renderTooltipNoteisAdded();
    this.renderTooltipErrorFieldEmpty();

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
        const noteId = +event.target.id;
        controller.addFavouriteNote(noteId);
      }

      if (event.target.classList.contains("trash-img")) {
        const noteId = +event.target.id;
        controller.deleteNote(noteId);
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
    newNote.id = note.id;
    const newNoteTitle = document.createElement("div");
    newNoteTitle.classList.add("new-note-title", note.noteColor);
    newNoteTitle.id = note.id;
    newNote.append(newNoteTitle);
    const newNoteTitleName = document.createElement("div");
    newNoteTitleName.classList.add("new-note-title-name");
    newNoteTitleName.id = note.id;
    newNoteTitle.append(newNoteTitleName);
    const newNoteTitleParagraph = document.createElement("p");
    newNoteTitleParagraph.textContent = note.noteTitle;
    const newNoteTitleIconsBlock = document.createElement("div");
    newNoteTitleIconsBlock.id = note.id;
    const favouriteNoteImg = document.createElement("img");
    favouriteNoteImg.id = note.id;
    favouriteNoteImg.classList.add("favourite-note-img");
    !note.isFavourite
      ? (favouriteNoteImg.src = "assets/heart inactive.png")
      : (favouriteNoteImg.src = "assets/heart active.png");
    favouriteNoteImg.alt = "Favorite notes";
    const trashImg = document.createElement("img");
    trashImg.id = note.id;
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
    newNote.id = note.id;
    const newNoteTitle = document.createElement("div");
    newNoteTitle.classList.add("new-note-title", note.noteColor);
    newNoteTitle.id = note.id;
    newNote.append(newNoteTitle);
    const newNoteTitleName = document.createElement("div");
    newNoteTitleName.classList.add("new-note-title-name");
    newNoteTitleName.id = note.id;
    newNoteTitle.append(newNoteTitleName);
    const newNoteTitleParagraph = document.createElement("p");
    newNoteTitleParagraph.textContent = note.noteTitle;
    const newNoteTitleIconsBlock = document.createElement("div");
    newNoteTitleIconsBlock.id = note.id;
    const favouriteNoteImg = document.createElement("img");
    favouriteNoteImg.id = note.id;
    favouriteNoteImg.classList.add("favourite-note-img");
    favouriteNoteImg.src = "assets/heart active.png";
    favouriteNoteImg.alt = "Favorite notes";
    const trashImg = document.createElement("img");
    trashImg.id = note.id;
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

  renderEmptyNote() {
    const notes = document.querySelector(".notes");
    const emptyNote = document.createElement("p");
    emptyNote.classList.add("empty-note");
    emptyNote.textContent =
      "У вас ещё нет ни одной заметки. Заполните поля выше и создайте свою первую заметку!";
    notes.append(emptyNote);
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

  renderQuantityofNotes(counterOfTask) {
    const notesQuantity = document.querySelector(".notes-quantity");
    notesQuantity.innerHTML = `<img src="assets/notes.png" alt="Notes quantity" />
              <span>Всего заметок: <b>${counterOfTask}</b></span>`;
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

  renderTooltipErrorFieldEmpty() {
    const TooltipErrorFieldEmpty = document.createElement("div");
    TooltipErrorFieldEmpty.classList.add(
      "tooltip",
      "tooltip-error-field-empty",
      "invisible"
    );
    const noteEntryBlock = document.querySelector(".note-entry-block");
    const TooltipErrorFieldEmptyMessage = document.createElement("span");
    TooltipErrorFieldEmptyMessage.textContent = "Заполните все поля!";
    const TooltipErrorFieldEmptyIcon = document.createElement("img");
    TooltipErrorFieldEmptyIcon.src = "assets/warning.png";
    TooltipErrorFieldEmpty.append(
      TooltipErrorFieldEmptyIcon,
      TooltipErrorFieldEmptyMessage
    );
    noteEntryBlock.after(TooltipErrorFieldEmpty);
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

  TooltipErrorFieldEmptyView() {
    const TooltipErrorFieldEmptyView = document.querySelector(
      ".tooltip-error-field-empty"
    );
    TooltipErrorFieldEmptyView.classList.toggle("invisible");
    setTimeout(() => {
      TooltipErrorFieldEmptyView.classList.toggle("invisible");
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

  EmptyNoteView() {
    const emptyNote = document.querySelector(".empty-note");
    emptyNote.classList.toggle("invisible");
  },

  favouriteNoteView(note) {
    const favouriteNote = document.querySelectorAll(".favourite-note-img");
    favouriteNote.forEach((item) => {
      if (+item.getAttribute("id") === note.id) {
        note.isFavourite
          ? (item.src = "assets/heart active.png")
          : (item.src = "assets/heart inactive.png");
      }
    });
  },
  deleteNote(note) {
    const deleteNote = document.querySelectorAll(".new-note");
    deleteNote.forEach((item) => {
      if (+item.getAttribute("id") === note.id) {
        item.remove();
      }
    });
  },
};

// обработка действий пользователя, обновление модели
const controller = {
  addNote(noteTitle, noteDescription, noteColor) {
    if (
      String(noteTitle).trim().length === 0 ||
      String(noteDescription).trim().length === 0
    ) {
      model.addTooltipErrorFieldEmpty();
    } else {
      String(noteTitle).trim().length > 50
        ? model.addTooltipError()
        : model.addNote(noteTitle, noteDescription, noteColor);
    }
  },
  addFavouriteNote(noteId) {
    model.addFavouriteNote(noteId);
  },
  deleteNote(noteId) {
    model.deleteNote(noteId);
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
