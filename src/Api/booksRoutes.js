import { Get , Post} from "./methods";

export const booksRoutes = {
    index: async () => {
        return Get("books");
    },
    create: async (data) => {
        return Post("books", data);
    },
    delete: async (id) => {
        return Post(`books/${id}`, {},"DELETE");
    },
};