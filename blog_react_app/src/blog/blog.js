import { useEffect, useState } from 'react'
import { getPost } from "../sanity_client";
import { useParams } from "react-router-dom";
import { urlFor } from '../sanity_img_builder';
import BlockContent from "@sanity/block-content-to-react";
import sanity_config from '../sanity_config';
import './blog.css'

function Blog() {
    const { id } = useParams();
    const [blog, setBlog] = useState()
    const [author, setAuthor] = useState()
    const [category, setCategory] = useState()

    useEffect(() => {
        getPost(id)
            .then((data) => {
                setBlog(data[0])
                setAuthor(data[1])
                setCategory(data[2])
            })
            .catch(console.error);
    }, []);

    return (
        <div>
            {blog ?
                <div>
                    <h1 className='blog_title'>{blog.title}</h1>
                    <div className='blog_author_category'>
                        <div className='blog_author'>
                            <img src={urlFor(author.image).url()}
                                alt={blog.title}
                            />
                            <p>{author.name}</p>
                        </div>

                        <div className='blog_author_category_divider'></div>

                        <div>
                            <p><span>{category.title}</span></p>
                        </div>

                        <div>
                            <p>{new Date(blog.publishedAt).toDateString()}</p>
                        </div>
                    </div>
                    <div className='blog_img_div'>
                        <img
                            src={urlFor(blog.mainImage).url()}
                            alt={blog.title}
                            className='blog_img'
                        />
                    </div>

                    <div className='blog_body'>
                        <BlockContent
                            blocks={blog.body}
                            projectId={sanity_config.projectId}
                            dataset={sanity_config.dataset}
                        />
                    </div>
                </div>
                : ''}
        </div>
    );
}

export default Blog;
