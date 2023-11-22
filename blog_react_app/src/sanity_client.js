import { createClient } from '@sanity/client'
import sanity_config from './sanity_config'
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient(sanity_config)

// Get blog based on ID 
export async function getPost(id) {
    const posts = await client.getDocument(id)
    const author = await client.getDocument(posts.author._ref)
    const category = await client.getDocument(posts.categories[0]._ref)
    return [posts, author, category]
}
// Get all blogs in Sanity
export async function getPosts() {
    const posts_temp = []
    const posts = await client.fetch(
        `*[_type == "post"]`
    )
    for (let index = 0; index < posts.length; index++) {
        const post = posts[index];

        const author = await client.getDocument(post.author._ref)
        const category = await client.getDocument(post.categories[0]._ref)
        posts_temp.push({
            ...post,
            author: author,
            category: category.title
        })
    }
    return posts_temp
}