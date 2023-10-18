import { apiFetchPublicGet , apiFetchPublicPost} from "./methods";

export const booksRoutes = {
    index: async () => {
        return apiFetchPublicGet("books");
    },
    create: async (data) => {
        return apiFetchPublicPost("books", data);
    },
};