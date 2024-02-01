import React from "react";
import { useEffect, useState } from "react";
import { PostCard, Container } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postSlice";
import { toast } from "react-toastify";
const Home = () => {
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

    const posts = data?.posts?.documents;

    if (posts?.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read Posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8 ">
            <Container>
                <div className="flex flex-wrap">
                    {posts?.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Home;
