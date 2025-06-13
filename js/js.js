const MOCK_NOTES = [
  {
    id: 1,
    noteTitle: "Работа с формами",
    noteDescription:
      "К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name",
    noteColor: "#c2f37d",
    isFavourite: false,
  },
];

const TOOLTIP_PARAMETRS = [
  {
    src: "images/icons/warning.png",
    classTooltip: "tooltip-error",
    message: "Максимальная длина заголовка - 50 символов",
  },
  {
    src: "images/icons/warning.png",
    classTooltip: "tooltip-error-description",
    message: "Максимальная длина описания - 250 символов",
  },
  {
    src: "images/icons/warning.png",
    classTooltip: "tooltip-error-field-empty",
    message: "Заполните все поля!",
  },
  {
    src: "images/icons/Done.png",
    classTooltip: "tooltip-note-is-added",
    message: "Заметка добавлена!",
  },
  {
    src: "images/icons/cancel.png",
    classTooltip: "tooltip-note-is-delete",
    message: "Заметка удалена!",
  },
];

const colors = {
  GREEN: "#c2f37d",
  BLUE: "#7de1f3",
  RED: "#f37d7d",
  YELLOW: "#f3db7d",
  PURPLE: "#e77df3",
};

const tooltipClasses = {
  errorMaxTitle: ".tooltip-error",
  errorMaxDescription: ".tooltip-error-description",
  errorFieldEmpty: ".tooltip-error-field-empty",
  successAdd: ".tooltip-note-is-added",
  successDelete: ".tooltip-note-is-delete",
};

const model = {
  notes: MOCK_NOTES,
  tooltipParametrs: TOOLTIP_PARAMETRS,
  isViewOnlyFavouriteNotes: false,

  addNote(noteTitle, noteDescription, noteColor) {
    switch (noteColor) {
      case "yellow":
        noteColor = colors.YELLOW;
        break;
      case "green":
        noteColor = colors.GREEN;
        break;
      case "blue":
        noteColor = colors.BLUE;
        break;
      case "red":
        noteColor = colors.RED;
        break;
      case "purple":
        noteColor = colors.PURPLE;
        break;
    }

    const note = {
      id: new Date().getTime(),
      noteTitle: noteTitle,
      noteDescription: noteDescription,
      noteColor: noteColor,
      isFavourite: false,
    };

    this.notes.push(note);
    this.updateNotesView();
  },

  deleteNote(noteId) {
    this.notes = this.notes.filter((item) => {
      return +item.id !== noteId;
    });
    this.updateNotesView();
  },

  updateNotesView() {
    let notesToRender;
    if (this.isViewOnlyFavouriteNotes) {
      notesToRender = this.notes.filter((note) => {
        return note.isFavourite === true;
      });
    } else {
      notesToRender = this.notes;
    }
    view.renderNotes(
      notesToRender,
      notesToRender.length,
      this.isViewOnlyFavouriteNotes
    );
    view.renderNotesCount(notesToRender.length, this.isViewOnlyFavouriteNotes);
  },

  toggleFavouriteNote(noteId) {
    this.notes = this.notes.map((item) => {
      if (item.id === noteId) {
        item.isFavourite = !item.isFavourite;
      }
      return item;
    });
    this.updateNotesView();
  },

  toggleShowOnlyFavorite() {
    this.isViewOnlyFavouriteNotes = !this.isViewOnlyFavouriteNotes;
    this.updateNotesView();
  },
};
// отображение данных: рендер списка задач, размещение обработчиков событий
const view = {
  init() {
    this.renderNotes(
      model.notes,
      model.notes.length,
      model.isViewOnlyFavouriteNotes
    );
    this.renderNotesCount(model.notes.length, model.isViewOnlyFavouriteNotes);
    this.renderTooltip(model.tooltipParametrs);

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
    });

    //Обработчик кнопок "добавить в избранное" и "удалить"

    noteBlockImg.addEventListener("click", (event) => {
      if (event.target.classList.contains("favourite-note-img")) {
        const noteId = +event.target.id;
        controller.toggleFavouriteNote(noteId);
      }

      if (event.target.classList.contains("trash-img")) {
        const noteId = +event.target.id;
        controller.deleteNote(noteId);
      }
    });
  },

  //Рендерим список заметок и счетчик количества заметок

  renderNotes(notesArray, counterOfTask, isViewOnlyFavouriteNotes) {
    const notes = document.querySelector(".notes");
    const blockFavoriteNotes = document.querySelector(".block-favorite-notes");

    let newNoteHTML = "";

    notesArray
      .slice()
      .reverse()
      .forEach((note) => {
        newNoteHTML += `
    <li class="new-note">
      <div class="new-note-title" style="background-color: ${note.noteColor}">
        <div class="new-note-title-name">
          <p>${note.noteTitle}</p>
          <div id="${note.id}">
            <img 
              id="${note.id}" 
              class="favourite-note-img" 
              src="${
                note.isFavourite
                  ? "images/icons/heart active.png"
                  : "images/icons/heart inactive.png"
              }" 
              alt="Favorite notes" 
            />
            <img 
              id="${note.id}" 
              class="trash-img" 
              src="images/icons/trash.png" 
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

    if (counterOfTask === 1 && !blockFavoriteNotes) {
      const noteEntryBlock = document.querySelector(".note-entry-block");
      const emptyNote = document.querySelector(".empty-note");
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
      emptyNote?.remove();
      blockFavoriteNotes.addEventListener("click", (event) => {
        if (event.target.type === "checkbox") {
          controller.toggleShowOnlyFavorite();
        }
      });
    } else if (counterOfTask < 1 && !isViewOnlyFavouriteNotes) {
      const blockFavoriteNotes = document.querySelector(
        ".block-favorite-notes"
      );
      const emptyNote = document.createElement("p");
      blockFavoriteNotes?.remove();
      emptyNote.classList.add("empty-note");
      emptyNote.innerHTML =
        "У вас ещё нет ни одной заметки.<br> Заполните поля выше и создайте свою первую заметку!";
      notes.before(emptyNote);
    }
  },

  renderNotesCount(counterOfTask, isViewOnlyFavouriteNotes) {
    const notesQuantity = document.querySelector(".notes-quantity");
    if (isViewOnlyFavouriteNotes) {
      notesQuantity.innerHTML = `<img src="images/icons/notes.png" alt="Notes quantity" />
              <span>Всего избранных заметок: <b>${counterOfTask}</b></span>`;
    } else {
      notesQuantity.innerHTML = `<img src="images/icons/notes.png" alt="Notes quantity" />
              <span>Всего заметок: <b>${counterOfTask}</b></span>`;
    }
  },

  //Информационные сообщения

  renderTooltip(tool_parametrs) {
    tool_parametrs.forEach((item) => {
      const TooltipError = document.createElement("div");
      TooltipError.classList.add("tooltip", item.classTooltip, "invisible");
      const noteEntryBlock = document.querySelector(".note-entry-block");
      const TooltipErrorMessage = document.createElement("span");
      TooltipErrorMessage.textContent = item.message;
      const TooltipErrorIcon = document.createElement("img");
      TooltipErrorIcon.src = item.src;
      TooltipError.append(TooltipErrorIcon, TooltipErrorMessage);
      noteEntryBlock.after(TooltipError);
    });
  },

  //Показываем и скрываем информационные сообщения

  showMessage(tooltipClass) {
    const tooltip = document.querySelector(tooltipClass);
    tooltip.classList.toggle("invisible");
    setTimeout(() => {
      tooltip.classList.toggle("invisible");
    }, 3000);
  },
};

// обработка действий пользователя, обновление модели
const controller = {
  addNote(noteTitle, noteDescription, noteColor) {
    const noteNameBlock = document.querySelector(
      "#note-name-block-title-input"
    );
    const noteNameDescription = document.querySelector("#note-name-input");
    const radioCheck = document.querySelectorAll(".radio");
    if (noteTitle.trim().length === 0 || noteDescription.trim().length === 0) {
      view.showMessage(tooltipClasses.errorFieldEmpty);
    } else if (noteTitle.trim().length > 50) {
      view.showMessage(tooltipClasses.errorMaxTitle);
    } else if (noteDescription.trim().length > 250) {
      view.showMessage(tooltipClasses.errorMaxDescription);
    } else {
      model.addNote(noteTitle, noteDescription, noteColor);
      view.showMessage(tooltipClasses.successAdd);
      noteNameBlock.value = ""; // Очищаем поле ввода
      noteNameDescription.value = "";
      radioCheck.forEach((item) => {
        if (item.value === "yellow") {
          item.checked = true;
        }
      });
    }
  },
  toggleFavouriteNote(noteId) {
    model.toggleFavouriteNote(noteId);
  },
  deleteNote(noteId) {
    model.deleteNote(noteId);
    view.showMessage(tooltipClasses.successDelete);
  },
  toggleShowOnlyFavorite() {
    model.toggleShowOnlyFavorite();
  },
};

function init() {
  view.init();
}

init();
