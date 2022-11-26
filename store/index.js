import { configureStore } from "@reduxjs/toolkit";
//MODULES
import languageReducer from "./modules/language";
import dialogContactReducer from "./modules/dialogContact";
import sidebarReducer from "./modules/sideBar";
import cartReducer from "./modules/cart";
import monthCollectionReducer from "./modules/monthCollection";
import defaultProductImageReducer from "./modules/defaultProductImage";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    dialogContact: dialogContactReducer,
    sideBar: sidebarReducer,
    cart: cartReducer,
    monthCollection: monthCollectionReducer,
    defaultProduct: defaultProductImageReducer,
  },
});
