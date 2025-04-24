import { View, Text } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getPost, getAllPosts } from "../repository/postRepository";
import Markdown from "react-native-markdown-display";
import { ScrollView } from "react-native-gesture-handler";

export async function generateStaticParams(): Promise<Record<string, string>[]> {
    const posts = getAllPosts();
    return posts.map(post => ({ slug: post.slug }));
}


const PostDetailsPage = () => {
    const { slug } = useLocalSearchParams();
    const [post, setPost] = useState(getPost(slug));

    if (!post) {
        return <Text>Post not found</Text>;
    }

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: 'white',
            }}
            contentContainerStyle={{
                maxWidth: 960,
                width: '100%',
                marginHorizontal: 'auto',
                padding: 20,
            }}
        >
            <Text style={{ fontSize: 30, marginBottom: 20 }}>{post.title}</Text>

            <Markdown>{post.content}</Markdown>
        </ScrollView>
    );
};

export default PostDetailsPage;