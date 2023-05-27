import { Action, ThunkAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "../hooks/hooks";
import { store } from "../store/store";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Define the type for the dispatch variable
export type AppDispatchType = ReturnType<typeof useAppDispatch>;
