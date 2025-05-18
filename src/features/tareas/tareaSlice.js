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

export const fetchTasksByName = createAsyncThunk(
  'tasks/fetchByName',
  async (titulo, { rejectWithValue }) => {
    try {
      const response = await tasksAPI.getByName(titulo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTasksByDateRange = createAsyncThunk(
  'tasks/fetchByDateRange',
  async ({ fechaInicio, fechaFin }, { getState, rejectWithValue }) => {
    try {
      const response = await tasksAPI.getByDateRange(fechaInicio, fechaFin);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/add',
  async (taskData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await tasksAPI.create({ ...taskData, usuarioId: auth.user.id });
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
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      await tasksAPI.delete(id, userId);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const startTask = createAsyncThunk(
  'tasks/start',
  async (id, { rejectWithValue }) => {
    try {
      const response = await tasksAPI.iniciarTarea(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const completeTask = createAsyncThunk(
  'tasks/complete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await tasksAPI.completarTarea(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTasksByStatus = createAsyncThunk(
  'tasks/fetchByStatus',
  async (estado, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await tasksAPI.getTareasPorEstado(auth.user.id, estado);
      return response.data;
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
    searchResults: [],
    searchLoading: false,
    dateRangeLoading: false,
    dateRangeResults: [],
    dateRangeError: null,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    }
  },
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

      .addCase(fetchTasksByName.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(fetchTasksByName.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.searchLoading = false;
      })
      .addCase(fetchTasksByName.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchTasksByDateRange.pending, (state) => {
        state.dateRangeLoading = true;
        state.dateRangeError = null;
        state.dateRangeResults = [];
      })
      .addCase(fetchTasksByDateRange.fulfilled, (state, action) => {
        state.dateRangeLoading = false;
        state.dateRangeResults = action.payload;
      })
      .addCase(fetchTasksByDateRange.rejected, (state, action) => {
        state.dateRangeLoading = false;
        state.dateRangeError = action.payload;
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
      })
      .addCase(startTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(fetchTasksByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = [];
      })
      .addCase(fetchTasksByStatus.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasksByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearchResults } = tasksSlice.actions;
export default tasksSlice.reducer;

export const selectDateRangeResults = (state) => state.tasks.dateRangeResults;
export const selectDateRangeLoading = (state) => state.tasks.dateRangeLoading;
export const selectDateRangeError = (state) => state.tasks.dateRangeError;