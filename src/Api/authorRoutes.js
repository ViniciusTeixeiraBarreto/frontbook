import { Get , Post} from "./methods";

export const authorRoutes = {
    index: async () => {
        return Get("author");
    },
    create: async (data) => {
        return Post("author", data);
    },
    delete: async (id) => {
        return Post(`author/${id}`, {},"DELETE");
    },
};