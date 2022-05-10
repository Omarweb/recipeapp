import View from "./View";
import previewView from "./previewView.js";
import icons from 'url:../../img/icons.svg';
class BookmarkView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = ' No bookmarks yet. Find a nice recipe and bookmark it :)';

    addHandlerRender(handler) {
        window.addEventListener('load', handler());
    }
    _generateMarkup() {
        return this._data.map(res => previewView.render(res, false)).join('');

    }
    

}
export default new BookmarkView();