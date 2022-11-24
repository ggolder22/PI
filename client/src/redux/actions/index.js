import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const GET_RECIPES_ID = "GET_RECIPES_ID";
export const GET_RECIPES_NAME = "GET_RECIPES_NAME";
export const CREATE_RECIPE = "CREATE RECIPE";
export const ORDER_AZ = "ORDER_AZ";
export const ORDER_ZA = "ORDER_ZA"
export const ORDER_HEALTHSCORE_ASC = "ORDER_HEALTHSCORE_ASC";
export const ORDER_HEALTHSCORE_DESC = "ORDER_HEALTHSCORE_DESC";
export const FILTER_DIETS = "FILTER_DIETS";
export const CLEAR = "CLEAR";
export const LOADING = "LOADING";
export const ADD_FAVORITES = "ADD_FAVORITES";
export const DELETE_FAVORITES = "DELETE_FAVORITES";
export const DELETE_RECIPE= "DELETE_RECIPE"
//export const FILTER_CREATED= "FILTER_CREATED"

//Promises: 

export function getRecipes() {
    return async (dispatch) => {             //dispatch es una accion de redux, aca estoy creando una funcion que retorna acciones,  
        await axios
            .get("/recipes")
            .then((response) => {
                dispatch({
                    type: GET_RECIPES,
                    payload: response.data,
                });
            })
            .catch((error) => {
                //throw new Error(error.message);
                //console.log(error)
            });
    };
}

export function getDiets() {
    return async (dispatch) => {
        await axios
            .get("/diets")
            .then((response) => {
                dispatch({
                    type: GET_DIETS,
                    payload: response.data
                });
            })
            .catch((error) => {
               //throw new Error(error);
               console.log(error)
            });
    };
}

export function createRecipe(value) {
    return async (dispatch) => {
        await axios
            .post("/recipes", value)
            .then((response) => {
                dispatch({
                    type: CREATE_RECIPE,
                    payload: response.data  
                });
            })
            .catch((error) => {
                throw new Error(error);
            });
    };

}

//Async Await

export function getRecipeById(id) {
    return async function (dispatch) {
        const recipeID = await axios(`/recipes/${id}`);
        return dispatch({
            type: GET_RECIPES_ID,
            payload: recipeID.data
        });
    };
}

export function getRecipesName(name) {
    return async function (dispatch) {
        try {
            const recipeName = await axios(`/recipes?name=${name}`);
            return dispatch({
                type: GET_RECIPES_NAME,
                payload: recipeName.data
            });
        } catch (error) {
            alert("The recipe does not exist, you can create one");
        }
    };
}

export function addFavorites(payload) {
    return {
        type: ADD_FAVORITES,
        payload
    };
}

export function deleteFav(id) {       //este filtra
    return {
        type: DELETE_FAVORITES,
        payload: id,
    };

}





//Filtros y ordanamiento

export function orderByAZ() {
    return {
        type: ORDER_AZ
    };
}

export function orderByZA() {
    return {
        type: ORDER_ZA
    };
}

export function orderHealthScoreAsc() {
    return {
        type: ORDER_HEALTHSCORE_ASC
    };
}

export function orderHealthScoreDesc() {
    return {
        type: ORDER_HEALTHSCORE_DESC
    };
}

export function filterDiets(payload) {
    //console.log(payload,"payload");
    return {
        type: FILTER_DIETS,
        payload
    };
}
export function clearDetail(payload) {
    return {
        type: CLEAR,
        payload
    };
}
export function loadingAction(payload) {
    return (dispatch) => {
        dispatch({
            type: LOADING,
            payload
        })
    }
}

export function deleteRecipeById(id) {
    return async function (dispatch) {
        const recipeID = await axios.delete(`/recipes/${id}`);
        return dispatch({
            type: DELETE_RECIPE,
            payload:recipeID.data,
        });
    };
}

// export function filterCreated(payload){
//     return {
//         type:FILTER_CREATED,
//         payload
//     }
// }

