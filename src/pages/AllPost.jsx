import React, { useEffect } from "react";
import { Container, PostCard } from "../components";
import { fetchPosts } from "../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllPost = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    if (data.isLoading) {
        return <h1>Loading...</h1>;
    }

    if (data.isError) {
        toast.error("Error in loading all post");
    }

    console.log("data", data);
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {data?.posts?.documents.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default AllPost;
