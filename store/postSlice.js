import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, query, deleteDoc, doc, orderBy, getDocs, addDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { db } from "../firestore";


//get collection ref
const collectionRef = collection(db, "blogs");

export const getAllBlogs = createAsyncThunk("blog/allBlogs", async (_, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
        const q = query(collectionRef, orderBy("date", "desc"));

        const querySnapshot = await getDocs(q);

        const dataArray = [];
        querySnapshot.forEach((doc) => {
            let imageID = doc.data().imageID;
            dataArray.push({ id: doc.id, ...doc.data() });
            dispatch(getAllImages(imageID));
        });

        return dataArray;
    } catch (error) {
        return (rejectWithValue(error.message));
    }
});

export const getAllImages = createAsyncThunk("blog/getImgaes", async (imageID, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const storage = getStorage();
    const imageRef = ref(storage, `image-${imageID}.jpg`);
    try {
        const url = await getDownloadURL(imageRef);
        return {[imageID] : url};
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


export const addBlog = createAsyncThunk("blog/addBlog", async (blogData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const docRef = await addDoc(collectionRef, blogData);
        console.log(docRef.id);
        return {...blogData, id:docRef.id};
    } catch (error) {
        return (rejectWithValue(error.message));
    }
});

export const updateBlog = createAsyncThunk("blog/updateBlog", async ({blogData,blogID}, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const documentRef = doc(db, "blogs", blogID);

    try {
        await updateDoc(documentRef, {
            ...blogData
        });
        return blogData;
    } catch (error) {
        return (rejectWithValue(error.message));
    }
});

export const deleteBlog = createAsyncThunk("blog/deleteBlog", async (blogID, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const documentRef = doc(db, "blogs", blogID);

    try {
        await deleteDoc(documentRef);
        return blogID;
    } catch (error) {
        return (rejectWithValue(error.message));
    }
});


const initialState = {
    isLoading:false,
    blogs: [],
    imagesData:{},
    error:null
};



export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        //new-post
        addPost: (state, action) => {
            return [
                ...state,
                action.payload
            ];
        },
        //update
        updatePost: (state, action) => {
            const id = action.payload.id;
            return [
                ...state.filter(post => post.id !== id),
                ...action.payload
            ]
        },
        //delete
        deletePost: (state, action) => {
            const id = action.payload.id;
            return [
                ...state.filter(post => post.id !== id),
            ]
        },
        //add-comment
        //payload = {id, comment}
        addComment: (state, action) => {
            const id = action.payload.id;
            
            const newPosts = state.blogs.filter(item => item.id !== id);
            const post = state.blogs.find(item => item.id === id);
            // console.log("---------------------");
            // console.log("FROM Reducer");
            // console.log(id);
            // console.log(state);
            // console.log("---------------------");
            return {
                ...state,
                blogs: [
                    {
                        ...post,
                        comments: [
                            ...post.comments,
                            action.payload.comment
                        ]
                    },
                    ...newPosts
                ]
            };
        }
    },
    extraReducers: builder => {
        //get all blogs
        builder.addCase(getAllBlogs.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(getAllBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.blogs = action.payload;
        });
        builder.addCase(getAllBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.blogs = [];
            state.error = action.payload;
        });

        //Add blog
        builder.addCase(addBlog.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(addBlog.fulfilled, (state, action) => {
            //add that blog (action.payload) to the blogs state , at the top;
            state.isLoading = false;
                state.blogs = [action.payload, ...state.blogs];
            console.log("added successfully");
            // console.log(action.payload);
        });
        builder.addCase(addBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log("Failed to add");
            console.log(action.payload);
        });


        //update blog
        builder.addCase(updateBlog.pending, state => {
            
        });
        builder.addCase(updateBlog.fulfilled, (state, action) => {
            //add that blog (action.payload) to the blogs state , at the top;
        });
        builder.addCase(updateBlog.rejected, (state, action) => {
            
        });

        //delete blog
        builder.addCase(deleteBlog.pending, state => {
            console.log("Pending");
            
        });
        builder.addCase(deleteBlog.fulfilled, (state, action) => {
            //filter blogs to remove the deleted blog
            console.log("Deleted");
        });
        builder.addCase(deleteBlog.rejected, (state, action) => {
            console.log("Failed");
        });

        //get all images for all blogs
        builder.addCase(getAllImages.pending, state => {

        });
        builder.addCase(getAllImages.fulfilled, (state, action) => {
            console.log("ADD Image");
            state.imagesData = { ...state.imagesData, ...action.payload };
        });
        builder.addCase(getAllImages.rejected, (state, action) => {
            console.log("Failed image");
            console.log(action.payload);
        });

    }
});

export const { addPost, updatePost, deletePost, addComment} = postSlice.actions;

export default postSlice.reducer;