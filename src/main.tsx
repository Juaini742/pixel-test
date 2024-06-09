import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TasksProvider } from "./hooks/useTasks.tsx";
import { GroupChatProvider } from "./hooks/useGroupChats.tsx";
import { PopVisibleProvider } from "./hooks/usePopVisible.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TasksProvider>
      <GroupChatProvider>
        <PopVisibleProvider>
          <App />
        </PopVisibleProvider>
      </GroupChatProvider>
    </TasksProvider>
  </React.StrictMode>
);
