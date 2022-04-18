import axios from 'axios';

const API = axios.create({baseURL: 'https://beket-memento-web-app.herokuapp.com/'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});


export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (postId, updatedPost) => API.patch(`/posts/${postId}`, updatedPost);
export const deletePost = (postId) => API.delete(`/posts/${postId}`);
export const likePost = (postId) => API.patch(`/posts/${postId}/like`);
export const commentPost = (value, postId) => API.post(`/posts/${postId}/comment`, { value })

export const signup = (formData) => API.post('/user/signup', formData);
export const signin = (formData) => API.post('/user/signin', formData);