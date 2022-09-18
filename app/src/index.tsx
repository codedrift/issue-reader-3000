import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { ApiClient } from "./api";
import { ErrorPage } from "./components/ErrorPage";
import { Home } from "./components/HomeView";
import { IssueDetailView } from "./components/IssueDetailView";
import { RootView } from "./components/RootView";
import { ThemeWrapper } from "./components/ThemeWrapper";
import "./index.css";
import { store } from "./redux";
import { fetchIssues } from "./redux/slices/issues.slice";
import { themeSlice } from "./redux/slices/theme.slice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootView />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        action: () => {
          console.log("hall")
        },
        loader: () => {
          // Default repo
          return redirect("/facebook/react");
        },
      },
      {
        path: "/:owner/:repository",
        element: <Home />,
        loader: async ({ request, params }) => {
          const { owner, repository } = params;
          if (owner && repository) {
            store.dispatch(
              fetchIssues({
                owner,
                repository,
                status: "all",
              }),
            );
          }
        },
      },

      {
        path: "/:owner/:repository/:number",
        element: <IssueDetailView />,
        loader: async ({ request, params }) => {
          const { owner, repository, number } = params;
          if (owner && repository && number) {
            // no need for redux since apollo caches anyway
            return ApiClient.fetchIssueDetail({
              owner,
              repository,
              number: Number(number),
            });
          }
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeWrapper>
        <RouterProvider router={router} />
      </ThemeWrapper>
    </Provider>
  </React.StrictMode>,
);
