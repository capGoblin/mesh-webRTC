import { useCallback, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import { io } from "socket.io-client";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { Excalidraw } from "@excalidraw/excalidraw";
import debounce from "lodash.debounce";

const socket = io("http://localhost:8080");

function App() {
  // const [socket, setSocket] = useState<Socket | null>(null);
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>();

  // const [pendingUpdates, setPendingUpdates] = useState([]);
  // const update = () => {
  //   setPendingUpdates((prev) => [...prev, data]);
  // };

  const debouncedUpdateScene = debounce((scene) => {
    if (excalidrawAPI) {
      excalidrawAPI.updateScene(scene);
    } else console.log("excalidrawAPI is not defined.");
  }, 500);

  socket.on("receive-data", (scene: readonly ExcalidrawElement[] | null) => {
    console.log(scene, "received");
    debouncedUpdateScene(scene);
  });

  // socket.on("receive-data", (data) => {
  //   console.log(data, "received");

  //   update();
  //   // setPendingUpdates((prev) => [...prev, data]);
  // });

  // useEffect(() => {
  //   if (pendingUpdates.length) {
  //     // batch-update scene
  //     excalidrawAPI?.updateScene(pendingUpdates);

  //     setPendingUpdates([]);
  //   }
  // }, [pendingUpdates]);

  // useEffect(() => {

  // socket.on("receive-data", (data) => {
  //   console.log(data, "received");

  // const updateScene = () => {
  //   const sceneData = {
  //     elements: data.elements,
  //     // appState: data.appState,
  //   };
  //   if (excalidrawAPI) {
  //     excalidrawAPI.updateScene(data);
  //   } else console.log("excalidrawAPI is not defined.");
  // };
  // updateScene();

  // });

  // }, [excalidrawAPI]);
  // socket.on("receive-data", (data) => {
  //   console.log(data, "received");
  //   const updateScene = () => {
  //     const sceneData = {
  //       elements: data.elements,
  //       // appState: data.appState,
  //     };
  //     excalidrawAPI.updateScene(data);
  //   };
  //   updateScene();
  // });
  // const socket = io("http://localhost:3000");

  // useEffect(() => {
  //   const socket = io("http://localhost:3000");
  //   setSocket(socket);
  //   socket.on("receive-data", (data) => {
  //     if (excalidrawAPI) {
  //       console.log(data, "received");
  //       const updateScene = () => {
  //         const sceneData = {
  //           elements: data.elements,
  //           // appState: data.appState,
  //         };
  //         excalidrawAPI.updateScene(data);
  //       };
  //       updateScene();
  //     } else {
  //       console.log("excalidrawAPI is falsy", excalidrawAPI);
  //     }
  //   });

  //   return () => {
  //     socket.disconnect();
  //     console.log(`${socket.id} disconnected`);
  //   };
  // }, [excalidrawAPI]);

  // useEffect(() => {
  //   // if (socket) {
  //     // }
  //   }, []);

  const handleDataChange = useCallback(
    (elements: readonly ExcalidrawElement[] | null) => {
      // const handleDataChange = (
      // elements: readonly ExcalidrawElement[] | null
      // state: AppState,
      // ): void => {
      console.log("hmmm");
      if (excalidrawAPI) {
        // Check if the length of elements is larger than the previousElements
        // if (elements.length > previousElements.current.length) {
        const sceneData = {
          elements: elements,
          // appState: excalidrawData.appState,
        };
        console.log(sceneData);
        socket.emit("send-data", sceneData);
        // }

        // Update previousElements with the current elements
        // previousElements.current = elements;
      } else {
        console.log(
          "excalidrawAPI or excalidrawData is falsy when sending data"
        );
      }
      // };

      // handleDataChange()
      //...
    },
    [excalidrawAPI]
  );

  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <h1 style={{ textAlign: "center" }}>Excalidraw Example</h1>
        <div
          style={{ height: "500px", width: "700px" }}
          className="custom-styles"
        >
          {/* <input type="textbox" onChange={(e) => setName(e.target.value)} /> */}
          {/* <label style={{ fontSize: "16px", fontWeight: "bold" }}> */}
          {/* <input
              type="checkbox"
              checked={isCollaborating}
              onChange={() => {
                if (!isCollaborating) {
                  const collaborators = new Map();
                  collaborators.set("id1", {
                    username: "Doremon",
                    avatarUrl: "../../../../img/doremon.png",
                  });
                  collaborators.set("id3", {
                    username: "Pika",
                    avatarUrl: "../../../../img/pika.jpeg",
                  });
                  excalidrawAPI?.updateScene({ collaborators });
                } else {
                  excalidrawAPI?.updateScene({
                    collaborators: new Map(),
                  });
                }
                setIsCollaborating(!isCollaborating);
              }}
            />
            Show Collaborators
          </label>{" "} */}
          <Excalidraw
            // excalidrawRef="excalidrawRef"
            // style
            ref={(api) => {
              if (!excalidrawAPI) {
                setExcalidrawAPI(api as ExcalidrawImperativeAPI | undefined);
              }
            }}
            // onChange={throttle(savaChanges, 3000)}
            onChange={handleDataChange}
            // renderTopRightUI={() => (
            // <LiveCollaborationTrigger
            //   isCollaborating={isCollaborating}
            //   onSelect={() => {
            //     window.alert("You clicked on collab button");
            //     setIsCollaborating(true);
            //   }}
            // />
            // <LiveCollaborationTrigger
            //   isCollaborating={isCollaborating}
            //   onSelect={() => {
            //     console.log(name);
            //     if (!isCollaborating) {
            //       const collaborators = new Map();
            //       collaborators.set("SAF", {
            //         username: name,
            //         avatarUrl: "../../../../img/doremon.png",
            //       });
            //       collaborators.set("asfsafas", {
            //         username: "some name",
            //         avatarUrl: "../../../../img/doremon.png",
            //       });
            //
            //       excalidrawAPI?.updateScene({
            //         collaborators: collaborators,
            //       });
            //       console.log(collaborators);
            //     } else {
            //       excalidrawAPI?.updateScene({
            //         collaborators: new Map(),
            //       });
            //     }
            //     setIsCollaborating(true);
            //   }}
            // />
            // )}
          />
        </div>
      </div>
    </>
  );
}

export default App;
