import { useState, useEffect } from "react";
import { getPosts } from "../sanity_client";
import { urlFor } from "../sanity_img_builder";
import './home.css'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts()
            .then((data) => {
                setPosts(data)
            })
            .catch(console.error);
    }, []);

    return (
        <div className="home_page">
            <h1 className="home_page_header">All Blogs</h1>
            {posts.map((blog, i) => (
                <div key={i}>
                    <div>
                        <div className="individual_blog_divider"></div>

                        <div className="individual_blog_link">
                            <a href={"/blog/" + blog._id} key={i}>
                                <h2>{blog.title}</h2>
                            </a>
                        </div>
                        <div className='blog_author_category'>
                            <div className='blog_author'>
                                <img src={urlFor(blog.author.image).url()}
                                    alt={blog.title}
                                />
                                <p>{blog.author.name}</p>
                            </div>

                            <div className='blog_author_category_divider'></div>

                            <div>
                                <p><span>{blog.category}</span></p>
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
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
