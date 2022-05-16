import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resualtView from './views/resualtView.js';
import paginationView from './views/paginationView.js';
import AddRecipeView from './views/addRecipeView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime/runtime';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

const recipeContainer = document.querySelector('.recipe');


// if (module.hot) module.hot.accept();


const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);


    if (!id) return;
    recipeView.renderSpinner(recipeContainer);

    resualtView.update(model.getSearchResultsPage());

    bookmarksView.update(model.state.bookmarks);
    //1) loading recipe

    await model.loadRecipe(id);
    const { recipe } = model.state;
    console.log(model.state.recipe);

    // Rendering recipe
    recipeView.render(model.state.recipe);


  } catch (err) {
    console.error(err);

  }
}

const controlSearchResults = async function () {
  try {


    const query = searchView.getQuery();
    if (!query) return;
    resualtView.renderSpinner();
    await model.loadSearchRes(query);


    resualtView.render(model.getSearchResultsPage(1));

    paginationView.render(model.state.search);
  } catch (err) {
    recipeView.renderError(err);
  }
}
const controlPagintion = function (goToPage) {
  resualtView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
}
const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
}



const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 2000);

  } catch (err) {
    console.error(err);
  }

}
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagintion);
  AddRecipeView.addHandlerUpload(controlAddRecipe);
 
}
init();



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
