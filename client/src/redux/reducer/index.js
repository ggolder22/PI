import {
    GET_RECIPES,
    GET_DIETS,
    GET_RECIPES_ID,
    GET_RECIPES_NAME,
    CREATE_RECIPE,
    ORDER_AZ,
    ORDER_ZA,
    ORDER_HEALTHSCORE_ASC,
    ORDER_HEALTHSCORE_DESC,
    FILTER_DIETS,
    CLEAR,
    LOADING,
    ADD_FAVORITES,
    DELETE_FAVORITES,
    DELETE_RECIPE,
    //FILTER_CREATED,

} from "../actions";

const initialState = {
    recipe: [],
    recipesAll: [],
    diets: [],
    recipeDetail: [],
    loading: true,
    favorites:[],
};

const rootRouter = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipe: action.payload,
                recipesAll: action.payload,
            };
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload,
            };
        case GET_RECIPES_ID:
            return {
                ...state,
                recipeDetail: action.payload,
            };
        case GET_RECIPES_NAME:
            return {
                ...state,
                recipe: action.payload,
            };
        case CREATE_RECIPE:
            return {
                ...state,
            };
        case ORDER_AZ:
            let resultAZ = state.recipe.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            });
            return {
                ...state,
                recipe: resultAZ,
            };
        case ORDER_ZA:
            let resultZA = state.recipe.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                return 0;
            });
            return {
                ...state,
                recipe: resultZA,
            };

        case ORDER_HEALTHSCORE_ASC:
            let resultAsc = state.recipe.sort(function (a, b) {
                if (a.healthScore > b.healthScore) return 1;
                if (a.healthScore < b.healthScore) return -1;
                return 0;
            });
            return {
                ...state,
                recipe: resultAsc,
            };
        case ORDER_HEALTHSCORE_DESC:
            let resultDesc = state.recipe.sort(function (a, b) {
                if (a.healthScore > b.healthScore) return -1;
                if (a.healthScore < b.healthScore) return 1;
                return 0;

            });
            return {
                ...state,
                recipe: resultDesc,
            };
        case FILTER_DIETS:

            const filter = state.recipesAll;
            if (action.payload === "all") {
                return {
                    ...state,
                    recipe: filter,
                }
            } else {
                //console.log(filter,"filter");
                const ff = filter.filter(r => r.diets?.some((d) => d?.toLowerCase() === action.payload.toLowerCase()))
                return {
                    ...state,
                    recipe: ff,
                }
            };
        // let dietFilter = [];
        // let allRecipesAux = state.recipesAll;
        // if (action.payload === "all") {
        //     dietFilter = allRecipesAux;
        // } else {
        //     dietFilter = allRecipesAux.filter((r) =>
        //         r.diets?.some((d) => d.name.toLowerCase() === action.payload.toLowerCase()));
        // }


        case ADD_FAVORITES:
            return {
                ...state,
                favorites: state.favorites.concat(action.payload),
            };

        case DELETE_FAVORITES:

            const fav = state.favorites.filter(e => e.id !== action.payload)

            return {
                ...state,
                favorites: fav,
            };
        // case FILTER_CREATED:
        //     const allRecipesAux=state.recipesAll
        //     const createdFilter = action.payload === 'created' ? allRecipesAux.filter

        case CLEAR:
            return {
                ...state,
                recipeDetail: action.payload,
            };
        case LOADING:
            return {
                ...state,
                loading: action.payload,
            };

        case DELETE_RECIPE:
            return {
                ...state, 
            } 
        
        default:
            return state;


    }
};

export default rootRouter;