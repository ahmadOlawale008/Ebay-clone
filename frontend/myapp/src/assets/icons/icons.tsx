// import NotificationIcon from "";
import { lazy } from "react";
import Searchicon from "./searchicon";
export const NotificationIcon = lazy(() => import("./notificationicon"))
export const SearchIcon = lazy(() => import("./searchicon"))
export const SettingsIcon = lazy(() => import("./settingsIcon"))
export const ShoppingCartIcon = lazy(() => import("./shopping-cart"))
export const StarDrawingIcon = lazy(() => import("./starDrawaing"))
export const UserIcon = lazy(() => import("./userIcon"))
export const FunUnderlineIcon = lazy(() => import("./funUnderline"))

export default interface IconType { iconStyles?: React.CSSProperties, className?: string }
