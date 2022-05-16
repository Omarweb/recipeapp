import { async } from "regenerator-runtime"
import { API_URL, PER_PAGE, KEY } from "./config.js";
import { AJAX } from "./helpers.js";
export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: PER_PAGE,
        page: 1
    },
    bookmarks: [],

}
const createRecipeObject = function (data) {
    const { recipe } = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        imageUrl: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && { key: recipe.key })
    }
}
export const loadRecipe = async function (id) {
    try {
        const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
        state.recipe = createRecipeObject(data);
        // console.log(res, data);

        // console.log(state.recipe);
        if (state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;
    } catch (err) {
        throw err;
    }
}

export const loadSearchRes = async function (query) {
    try {
        state.search.query = query;
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                imageUrl: rec.image_url,
                ...(rec.key && { key: rec.key })
            }
        })


    } catch (err) {
        throw err;
    }
}

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = state.search.resultsPerPage * page;

    return state.search.results.slice(start, end);
}

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * newServings / state.recipe.servings;
    });
    state.recipe.servings = newServings;
}

const presistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function (recipe) {
    state.bookmarks.push(recipe);

    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    presistBookmarks();
}

export const deleteBookmark = function (id) {
    const index = state.bookmarks.findIndex(el => el.id === id)
    state.bookmarks.splice(index, 1);
    if (id === state.recipe.id) state.recipe.bookmarked = false;
    presistBookmarks();
}
const init = function () {
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
}


init();

export const uploadRecipe = async function (newRecipe) {
    try {

        let ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '').reduce((rv, obj) => {
            const ogkey = obj[0];
            const keyfr = ogkey.split('_');
            const key = keyfr[0];
            const el = keyfr[1];

            rv[key] = rv[key] || [];
            rv[key][el] = obj[1];
            return rv;
        }, []);

      
        ingredients = Object.entries(ingredients)
            .map(([key, value]) => {

                console.log("VALue type", typeof value);

                const { quantity, unit, description } = value;

                return { quantity: quantity ? +quantity : null, unit, description };

            });



        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: newRecipe.cookingTime,
            servings: newRecipe.servings,
            ingredients
        }
        console.log(recipe);
        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);

        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe);
        console.log(data);
    } catch (err) {
        throw err;
    }



}
console.log(state.bookmarks);