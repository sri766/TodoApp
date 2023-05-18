import { useEffect,useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
function Posts(){
    const navigate = useNavigate();
    const [posts, setPosts] = useState(); 
    const [updatedPost, setUpdatedPost] = useState({});

    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        // console.log("useEffect");

        axios
            .get("/post")
            .then((res) => {
                console.log(res.data);
                setPosts(res.data);
            })
            .catch((err)=> console.log(err));
    },[])

    const deletePost = (id) => {
        // console.log(id);

        axios
            .delete(`/delete/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        window.location.reload();
    };

    const updatePost = (post) => {
        setUpdatedPost(post);
        handleShow();
    };

    const handleChange = (e) => {

        const {name, value} = e.target;
        setUpdatedPost((prev)=>{
            return{
                ...prev,
                [name]: value,
            };
        });
    };

    const saveUpdatedPost = () => {
        console.log(updatedPost);

        axios
            .put(`/update/${updatedPost._id}`, updatedPost)
            .then((res) =>  console.log(res))
            .catch((err)=>console.log((err)));

            handleClose();

        window.location.reload();
    };
    return(
        <div className="posts" style={{ maxwidth: "50%" , margin: "auto auto", textAlign:"center",}} >
            <h1>Posts Page</h1>
            <Button style={{ width: "50%", marginBottom: "10px"}} variant="outline-dark"onClick={() =>navigate(-1)}>BACK</Button>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Update a Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control placeholder="title" style={{ margin: " 0px 0px 1rem 0px"}} 
                            name='title' value = {updatedPost.title ? updatedPost.title : ""} onChange={handleChange} />
                            <Form.Control placeholder='description'
                            name='description' value = {updatedPost.description ? updatedPost.description : ""} onChange={handleChange}/>

                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveUpdatedPost}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
          {posts? (
            <>
                {posts.map((post) => {
                    return(
                        <div className='post'
                        key={post._id}
                        style={{ 
                            border: "1px lightgray solid",
                            padding: "1rem",
                            margin: "10px auto 10px auto ", 
                            marginBottom: "1rem",
                            borderRadius: "10px",
                            textAlign:"center",
                            width: "50%",
                            height: "160px",
                            }}>
                            <h4>{post.title}</h4>
                            <p>{post.description}</p>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",

                            }}>
                                <Button style={{ margin: "1rem", width: "100%"}}
                                variant="outline-info"
                                onClick={()=>updatePost(post)}>UPDATE</Button>
                                <Button style={{ margin: "1rem", width: "100%"}}
                                variant="outline-danger" 
                                onClick={()=> deletePost(post._id)}>DELETE</Button>
                            </div>
                        </div>
                    )
                })}
            </>
          ): ""}
        </div>
    );
}

export default Posts;