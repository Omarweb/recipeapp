import View from "./View";
import previewView from "./previewView.js";
import icons from 'url:../../img/icons.svg';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found';
  _generateMarkup() {
    return this._data.map(res => previewView.render(res, false)).join('');

  }

  
}
export default new ResultsView();