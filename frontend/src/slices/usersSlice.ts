import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserProps, UserType } from '../models';
import axios from 'axios';


// Асинхронный thunk для получения данных пользователя из БД
export const fetchUserData = createAsyncThunk('user/fetchUserData', async (userId: number) => {
    const response = await axios.get(`/api/users/${userId}/`); // Пример запроса к API
    return response.data as UserType;
});

const loadInitialState = (): UserProps => {
    const savedState = localStorage.getItem('authState');
    if (savedState) {
        return JSON.parse(savedState) as UserProps;
    }
    return {
        loginUser: null,
        currentUser: null,
        activeState: 'logout', // начальное состояние по умолчанию
        view: 'list',
        isLoading: false,
        error: '',
    };
};

const initialState: UserProps = loadInitialState();

const UsersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<UserType>) => {
            state.activeState = 'auth';
            state.loginUser = action.payload;
            localStorage.setItem('authState', JSON.stringify(state)); // Сохраняем состояние при успешном входе
        },
        logoutSuccess: (state) => {
            state.activeState = 'logout';
            state.loginUser = null;
            localStorage.setItem('authState', JSON.stringify(state)); // Сохраняем состояние при выходе
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        });
        builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserType>) => {
            state.isLoading = false;
            state.loginUser = action.payload;
            localStorage.setItem('authState', JSON.stringify(state)); // Обновляем локальное хранилище
        });
        builder.addCase(fetchUserData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Ошибка загрузки данных пользователя';
        });
    },
});

export const { loginSuccess, logoutSuccess } = UsersSlice.actions;
export default UsersSlice.reducer;
