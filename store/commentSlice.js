import { async } from "@firebase/util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, query, deleteDoc, doc, orderBy, getDocs, addDoc, where, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firestore";

//collection reference
const collectioRef = collection(db, "comments");

export const getCommentsForCertainPost = createAsyncThunk("comment/getAllComments", async (postID, APIThunk) => {
    const { rejectWithValue} = APIThunk;
    try {
        let commentsArray = {};
        const q = query(collectioRef, where("postID", "==", postID));
        const snapshots = await getDocs(q);

        snapshots.forEach((doc) => {
            commentsArray = { id: doc.id, ...doc.data() };
        });

        return commentsArray;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addComment = createAsyncThunk("comment/addComment", async ({postID, commentData}, APIThunk) => {
    const { rejectWithValue, getState } = APIThunk;
    const state = getState();
    const documentID = state.comments.allCommentsData.id;
    const documentRef = doc(db, "comments", documentID);
    try {

        await updateDoc(documentRef, {
            comments: arrayUnion(commentData)
        });
        return commentData;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState = {
    isLoading: false,
    allCommentsData: [],
    error: null
};

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: builder => {
        //get all comments
        builder.addCase(getCommentsForCertainPost.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(getCommentsForCertainPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allCommentsData = action.payload;
        });
        builder.addCase(getCommentsForCertainPost.rejected, (state, action) => {
            state.isLoading = false;
            state.allCommentsData = [];
            state.error = action.payload;
        });

        //add new comment
        builder.addCase(addComment.pending, state => {
            console.log("Pending");
            state.isLoading = true;
        });
        builder.addCase(addComment.fulfilled, (state, action) => {
            console.log("Fulfilled");
            console.log(action.payload);
            state.isLoading = false;
            state.allCommentsData = {...state.allCommentsData, comments: [action.payload,...state.allCommentsData.comments]};
        });
        builder.addCase(addComment.rejected, (state, action) => {
            console.log("rejected");
            console.log(action.payload);
            state.isLoading = false;
            state.allCommentsData = [];
            state.error = action.payload;
        });
    }
});

export default commentSlice.reducer;