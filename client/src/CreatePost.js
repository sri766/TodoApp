import { Button , Form} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';

function CreatePost(){
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title:"",
        description:""
      });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setPost((prev) =>{
            return{
                ...post,
                [name]: value
            };
        });
    };

    const handleClick = (e) => {   
        e.preventDefault();

        console.log(post);

        axios
            .post("http://localhost:3000/create", post)
            .then((response) => console.log(response.data))
            .catch((err) => console.log(err));


        navigate("posts");
    };

    return(
        <div style={{width:"50%", margin:"auto auto", textAlign:"center"}}>
            <h1>Create a Post</h1>
            <Form>
                <Form.Group>
                    <Form.Control 
                        value={post.title}
                        onChange={handleChange}
                        name="title" 
                        placeholder="Title" 
                        style={{marginBottom: "1rem"}}/>
                    <Form.Control 
                        value={post.description}
                        onChange={handleChange}
                        name="description" 
                        placeholder="Description" 
                        style={{marginBottom: "1rem"}}/>
                </Form.Group>
            </Form>
            <Button onClick={handleClick} 
            style={{ width: "100%", marginBottom:"1rem"}} 
            variant="outline-success">CREATE POST</Button>

            <Button style={{ width: "100%",}}
            variant= "outline-dark"
            onClick={()=> navigate(-1)}>BACK</Button>
        </div>
    )
}

export default CreatePost;