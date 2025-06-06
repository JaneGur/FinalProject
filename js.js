// хранение данных, бизнес-логика
const colors = {
  GREEN: "#c2f37d",
  BLUE: "#7de1f3",
  RED: "#f37d7d",
  YELLOW: "#f3db7d",
  PURPLE: "#e77df3",
};

const model = {
  notes: [],
  counterOfTask: 0,
  isViewOnlyFavouriteNotes: false,

  addNote(noteTitle, noteDescription, noteColor) {
    if (noteColor === "yellow") {
      noteColor = colors.YELLOW;
    } else if (noteColor === "green") {
      noteColor = colors.GREEN;
    } else if (noteColor === "blue") {
      noteColor = colors.BLUE;
    } else if (noteColor === "red") {
      noteColor = colors.RED;
    } else if (noteColor === "purple") {
      noteColor = colors.PURPLE;
    }
    const note = {
      id: new Date().getTime(),
      noteTitle: noteTitle,
      noteDescription: noteDescription,
      noteColor: noteColor,
      isFavourite: false,
    };
    this.counterOfTask += 1;
    if (this.counterOfTask === 1) {
      view.renderFavouriteNoteCheckbox(this.counterOfTask);
      view.EmptyNoteView();
    }
    this.notes.push(note);
    view.renderNotes(this.notes, this.counterOfTask);
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
        view.renderNotes(this.notes, this.counterOfTask);
      }
      return item;
    });
  },
  deleteNote(noteId) {
    this.counterOfTask -= 1;
    if (this.counterOfTask === 0) {
      view.renderEmptyNote();
      view.renderFavouriteNoteCheckbox(this.counterOfTask);
    }
    this.notes = this.notes.filter((item) => {
      return +item.id !== noteId;
    });
    view.TooltipNoteisDeleteView();
    view.renderNotes(this.notes, this.counterOfTask);
  },
  viewOnlyFavouriteNotes() {
    this.isViewOnlyFavouriteNotes = !this.isViewOnlyFavouriteNotes;

    if (this.isViewOnlyFavouriteNotes) {
      const arrayOnlyFav = this.notes.filter((note) => {
        return note.isFavourite === true;
      });
      view.renderNotes(arrayOnlyFav, this.counterOfTask);
    } else {
      view.renderNotes(this.notes, this.counterOfTask);
    }
  },
};
// отображение данных: рендер списка задач, размещение обработчиков событий
const view = {
  init() {
    // this.renderNotes({
    //   noteTitle: "Изучить паттерн MVC",
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
    const radioCheck = document.querySelectorAll(".radio");
    const noteBlockImg = document.querySelector(".notes");

    //Обработчик формы

    noteEntryBlock.addEventListener("submit", function (event) {
      event.preventDefault(); // Предотвращаем стандартное поведение формы
      const noteTitle = noteNameBlock.value;
      const noteDescription = noteNameDescription.value;
      let noteColor;
      radioCheck.forEach((item) => {
        if (item.checked) {
          noteColor = item.value;
          controller.addNote(noteTitle, noteDescription, noteColor);
        }
      });

      noteNameBlock.value = ""; // Очищаем поле ввода
      noteNameDescription.value = "";
    });

    //Обработчик кнопок "добавить в избранное" и "удалить"

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
  },

  //список заметок

  renderNotes(notesArray, counterOfTask) {
    const notes = document.querySelector(".notes");
    const notesQuantity = document.querySelector(".notes-quantity");
    let newNoteHTML = "";

    notesArray
      .slice()
      .reverse()
      .forEach((note) => {
        newNoteHTML += `
    <li class="new-note" id="${note.id}">
      <div class="new-note-title" id="${note.id}" style="background-color: ${
          note.noteColor
        }">
        <div class="new-note-title-name" id="${note.id}">
          <p>${note.noteTitle}</p>
          <div id="${note.id}">
            <img 
              id="${note.id}" 
              class="favourite-note-img" 
              src="${
                note.isFavourite
                  ? "assets/heart active.png"
                  : "assets/heart inactive.png"
              }" 
              alt="Favorite notes" 
            />
            <img 
              id="${note.id}" 
              class="trash-img" 
              src="assets/trash.png" 
              alt="Delete note" 
            />
          </div>
        </div>
      </div>
      <p class="new-note-description">${note.noteDescription}</p>
    </li>
  `;
      });

    notes.innerHTML = newNoteHTML;

    notesQuantity.innerHTML = `<img src="assets/notes.png" alt="Notes quantity" />
              <span>Всего заметок: <b>${counterOfTask}</b></span>`;
  },

  //Когда заметок нет, отображаем текст: “У вас ещё нет ни одной заметки. Заполните поля выше и создайте свою первую заметку!”

  renderEmptyNote() {
    const notes = document.querySelector(".notes");
    const emptyNote = document.createElement("p");
    emptyNote.classList.add("empty-note");
    emptyNote.textContent =
      "У вас ещё нет ни одной заметки. Заполните поля выше и создайте свою первую заметку!";
    notes.before(emptyNote);
  },

  //Чек-бокс "Показать только избранные заметки"

  renderFavouriteNoteCheckbox(counterOfTask) {
    if (counterOfTask > 0) {
      const noteEntryBlock = document.querySelector(".note-entry-block");
      const blockFavoriteNotes = document.createElement("div");
      blockFavoriteNotes.classList.add("block-favorite-notes");
      const FavoriteNotesLabel = document.createElement("label");
      FavoriteNotesLabel.classList.add("favorite-notes");
      blockFavoriteNotes.append(FavoriteNotesLabel);
      const FavoriteNotesInput = document.createElement("input");
      FavoriteNotesInput.classList.add("checkbox");
      FavoriteNotesInput.type = "checkbox";
      FavoriteNotesInput.name = "checkbox";
      FavoriteNotesInput.value = "checkbox";
      FavoriteNotesInput.id = "checkbox";
      const FavoriteNotesCheckboxTitle = document.createElement("span");
      FavoriteNotesCheckboxTitle.classList.add("favorite-notes-checkbox");
      FavoriteNotesCheckboxTitle.textContent =
        "Показать только избранные заметки";
      FavoriteNotesLabel.append(FavoriteNotesInput, FavoriteNotesCheckboxTitle);
      noteEntryBlock.after(blockFavoriteNotes);
      blockFavoriteNotes.addEventListener("click", (event) => {
        if (event.target.type === "checkbox") {
          controller.viewOnlyFavouriteNotes();
        }
      });
    } else {
      const blockFavoriteNotes = document.querySelector(
        ".block-favorite-notes"
      );
      blockFavoriteNotes.remove();
    }
  },

  //Информационные сообщения

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

  //Показываем и скрываем информационные сообщения

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
    emptyNote.remove();
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
  viewOnlyFavouriteNotes() {
    model.viewOnlyFavouriteNotes();
  },
};

view.init();
