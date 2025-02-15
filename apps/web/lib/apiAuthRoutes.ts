import Env from "./env";

export const BASE_URL = Env.BACKEND_URL;
export const API_URL = BASE_URL + "/api";
export const AUTH_USER = API_URL + "/auth";
export const CHAT_URL = API_URL + "/messages";
// export const USER_DATA = API_URL + "/user-data";
// export const CHATS_URL = API_URL + "/groups";
// export const CHAT_GROUP_USERS = API_URL + "/chat-group-user";
