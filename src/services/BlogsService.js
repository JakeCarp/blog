import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class BlogsService {
    async getAll(query) {
        const res = await api.get('/api/blogs' + query)
        logger.log(res.data)
        AppState.blogs = res.data
    }
    async createBlog(blogData) {
        const res = await api.post('api/blogs', blogData)
        logger.log(res.data)
        AppState.blogs.unshift(res.data)
    }
    async removeBlog(id) {
        await api.delete('api/blogs/' + id)
        AppState.blogs.filter(b => b.id !== id)
    }
}

export const blogsService = new BlogsService()