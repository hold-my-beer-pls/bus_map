import {injectStores} from "@mobx-devtools/tools";
import {RouteStore} from "./routeStore";

const routeStore = new RouteStore();

injectStores({routeStore})

export {routeStore}