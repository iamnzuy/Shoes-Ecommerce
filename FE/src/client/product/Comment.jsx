import axios from "axios";
import { comment } from "postcss";
// For future development

function Comment(){
    const [comments, setComments] = useState([]);
    
    axios.defaults.baseURL = `http://localhost:5000`;

    // comments = [
    //     {
    //         content: "Hello",
    //         author: "Hutao",
    //         id: 5,
    //         replies: [
    //             {
    //                 content: "hallo",
    //                 author: "Mita",
    //                 id: 7,
    //                 replies: [
    //                 ]
    //             }
    //         ]
    //     }
    // ]

    const getComments = () => {
        const res = axios.get(``)
        .catch((error) => {
            console.log(error);
        })
    }

    const loadComments = () => {
        const commentsParts = comments.forEach((comment) => {
            return (
                <div>
                    <h3>{comment.author}</h3>
                    <p>{comment.content}</p>
                </div>
            )
        })
    }
    return (
    <div>
        <div>
            <textarea name="" id="" placeholder="Type comment here"></textarea>
            <button type="submit">Submit</button>
        </div>
        <div>
            {loadComments()}
        </div>
    </div>
    )
}

export default Comment;