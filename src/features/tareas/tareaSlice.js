import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tasksAPI from './tareaApi';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await tasksAPI.getAll(auth.user.id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/add',
  async (taskData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await tasksAPI.create({ ...taskData, usuario: auth.user.id });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/update',
  async ({ id, ...taskData }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await tasksAPI.update(id, { ...taskData, usuario: auth.user.id });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await tasksAPI.delete(id, auth.user.id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(task => task._id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;