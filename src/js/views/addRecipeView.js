import View from "./View";

import icons from 'url:../../img/icons.svg';
class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _addmore = document.querySelector('.add-more');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');
    _ingColumn = document.querySelector('.ing__column');

    _ingFileds = 1;

    _errorMessage = 'Error';
    _message = 'Success';
    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
        this._addHandlerMoreIng();
        this._addHandlerRemoveIng();
    }

    toggleWindow(open) {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
        if (!open) return;
        this._window.querySelector('.message')?.remove();
        this._parentElement.classList.remove('d-none');
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this, true))
    }
    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this))
    }

    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);

            handler(data);
            this.reset()
        })
    }

    _addHandlerMoreIng() {
        this._addmore.addEventListener('click', this._addField.bind(this))
    }

    _addField(e) {
        e.preventDefault();
        if (this._ingFileds >= 6) return;
        const name = Math.random().toString(36).substring(2, 7);;
        const markup = ` 
        <div class="ingredient-${name} ingredient--div">
        <label>Ingredient </label>
        <input value="" type="text" class="ingredient--input" required name="ingredient-${name}_quantity"
          placeholder="Quantity" />
        <input value="" type="text" class="ingredient--input" required name="ingredient-${name}_unit"
          placeholder="Unit" />
        <input value="" type="text" class="ingredient--input" required name="ingredient-${name}_description"
          placeholder="Description" />
          <button class="btn--tiny remove--ing">   <svg> <use href="${icons}#icon-minus-circle"></use> </svg> </button>
      </div>`;

        this._addmore.insertAdjacentHTML('beforeBegin', markup);
        this._ingFileds++;

    }
    _addHandlerRemoveIng() {


        this._ingColumn.addEventListener('click', this._removeField.bind(this))
    }



    _removeField(e) {
        e.preventDefault();
        const btn = e.target.closest('.remove--ing');

        if (!btn) return;
        const div = btn.closest('.ingredient--div').remove();
        this._ingFileds--;

        console.log(this._ingFileds);
    }

    _generateMarkup() {


    }

    _clear() {

        this._parentElement.classList.add('d-none');
        this._window.querySelector('.message')?.remove();
        this._window.querySelector('.spinner')?.remove();

    }

    renderMessage(message = this._message) {
        const markup = `<div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
        this._clear();
        this._window.insertAdjacentHTML('afterbegin', markup);
    }
    renderSpinner() {
        const markup = `<div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>`;
        this._clear();
        this._window.insertAdjacentHTML('afterbegin', markup);
    }


}
export default new AddRecipeView();