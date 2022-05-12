import View from "./View";

import icons from 'url:../../img/icons.svg';
class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _addmore = document.querySelector('.add-more');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');
    _errorMessage = 'Error';
    _message = 'Success';
    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
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
        })
    }

    addHandlerMoreIng() {
        let i = 1;
        const moreBtn = this._moreBtn;
        this._addmore.addEventListener('click', function (e) {

            e.preventDefault();
            if (i >= 6) return;
            i++;
            this.insertAdjacentHTML('beforeBegin', moreBtn(i));

        })
    }

    _moreBtn(i) {
        return ` <label>Ingredient ${i}</label>
        <div class="ingredient-${i}">
        <input value="0.5" type="text" class="ingredient--input" required name="ingredient-${i}_quantity"
          placeholder="Quantity" />
        <input value="KG" type="text" class="ingredient--input" required name="ingredient-${i}_unit"
          placeholder="Unit" />
        <input value="Rice" type="text" class="ingredient--input" required name="ingredient-${i}_description"
          placeholder="Description" />
      </div>`;
    }
    _generateMarkup() {


    }


}
export default new AddRecipeView();