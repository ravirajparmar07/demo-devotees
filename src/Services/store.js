import { configureStore } from "@reduxjs/toolkit";
import { loginSignup } from "@/Services/loginSignup";
import { dashboard } from "@/Services/dashboard";
import { myprofile } from "@/Services/myprofile";
import { camera } from "@/Services/camera";
import { RolePermission } from "@/Services/RolePermission";

const store = configureStore({
  reducer: {
    [loginSignup.reducerPath]: loginSignup.reducer,
    [dashboard.reducerPath]: dashboard.reducer,
    [myprofile.reducerPath]: myprofile.reducer,
    [camera.reducerPath]: camera.reducer,
    [RolePermission.reducerPath]: RolePermission.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      loginSignup.middleware,
      dashboard.middleware,
      myprofile.middleware,
      camera.middleware,
      RolePermission.middleware,
    ]),
});

export default store;
