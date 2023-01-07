import { configureStore } from "@reduxjs/toolkit";
//MODULES
import languageReducer from "./modules/language";
import dialogContactReducer from "./modules/dialogContact";
import sidebarReducer from "./modules/sideBar";
import cartReducer from "./modules/cart";
import monthCollectionReducer from "./modules/monthCollection";
import itemsNavBarReducer from "./modules/itemsNavBar";
import itemsShopByReducer from "./modules/itemsShopBy";
import algoliaModalReducer from "./modules/algoliaModal";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    dialogContact: dialogContactReducer,
    sideBar: sidebarReducer,
    cart: cartReducer,
    monthCollection: monthCollectionReducer,
    itemsNavBar: itemsNavBarReducer,
    itemsShopByReducer: itemsShopByReducer,
    algoliaModal: algoliaModalReducer,
  },
});
