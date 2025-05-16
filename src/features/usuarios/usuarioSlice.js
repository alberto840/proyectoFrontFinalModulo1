import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usuariosApi from './usuarioApi';

export const createUser = createAsyncThunk(
  'usuarios/create',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await usuariosApi.createUsuario(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  'usuarios/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await usuariosApi.getAllUsuarios();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'usuarios/getById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await usuariosApi.getUsuarioById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'usuarios/update',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await usuariosApi.updateUsuario(id, userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'usuarios/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await usuariosApi.deleteUsuario(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState: {
    items: [],
    item: null,
    loading: 'idle',
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.item = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.items.push(action.payload);
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload;
    });

    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.items = action.payload;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload;
    });

    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.item = action.payload;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.items = state.items.map(item =>
        item._id === action.payload._id ? action.payload : item
      );
      state.item = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload;
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.items = state.items.filter(item => item._id !== action.payload._id);
      state.item = null;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload;
    });
  },
});

export const { clearUser } = usuariosSlice.actions;
export default usuariosSlice.reducer;
