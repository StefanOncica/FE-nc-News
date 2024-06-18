import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react"
import { fetchArticleById } from '../Api';

function ArticleBodyById() {
    const { id } = useParams()

    const [articleByID, setArticleById] = useState({})
    
    useEffect(() => {
        fetchArticleById(id).then((data) => {
            setArticleById(data)

    }, {})
    })

    return (
        <div>
            <h3> {articleByID.title} </h3>
            <h4> by: {articleByID.author}</h4>
            <img  src={articleByID.article_img_url} alt="" />
            <p> {articleByID.body} </p>
        </div>
    )
}

export default ArticleBodyById