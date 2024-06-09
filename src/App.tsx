import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatBox from "./components/molecules/inbox/group/chatBox";
import { useState } from "react";
import Template from "./components/template";
import PrivateChat from "./components/molecules/inbox/private/privateChat";
import TaskMainComponent from "./components/pages/task";
import InboxMainComponent from "./components/pages/inbox";

function App() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <Template
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        >
          <div></div>
        </Template>
      ),
    },
    {
      path: "/inbox",
      element: (
        <Template
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        >
          <InboxMainComponent />
        </Template>
      ),
    },
    {
      path: "/task",
      element: (
        <Template
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        >
          <TaskMainComponent />
        </Template>
      ),
    },
    {
      path: "/inbox/:id",
      element: (
        <Template
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        >
          <div className="bg-white">
            <ChatBox />
          </div>
        </Template>
      ),
    },
    {
      path: "/private/:id",
      element: (
        <Template
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        >
          <PrivateChat />
        </Template>
      ),
    },
  ]);

  console.log();

  return <RouterProvider router={routes} />;
}

export default App;
