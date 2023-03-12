const { UseChannelApi } = require("./classes");
const { UseBridgeApi } = require("./classes");

const WebSocket = require("ws");

const url = "http://localhost:8088/ari";
const username = "asterisk";
const password = "password";
const ariUrl =
  "ws://127.0.0.1:8088/ari/events?api_key=asterisk:asterisk&app=hello-world";
const ws = new WebSocket(ariUrl);

ws.on("open", () => {
  console.log("WebSocket connected successfully");
  some();
});
ws.on("message", async (data) => {
  const someData = JSON.parse(data);
  console.log(someData);
});
ws.on("error", (e) => {
  console.log("some error Occurred", e);
});
ws.on("close", () => {
  console.log("Websocket Closed Successfully");
});

const channelobj = new UseChannelApi({
  username: "asterisk",
  password: "asterisk",
  baseUrl: `${url}`,
});
const some = async () => {
  try {
    const someData = await channelobj.originate({
      endpoint: "sip/7002",
      app: "hello-world",
    });
    console.log(someData.data);
  } catch (e) {
    console.log("some error occurred", e);
  }
};
