const axios = require("axios");
class UseChannelApi {
  constructor(params) {
    const { username, password } = params;
    this._baseUrl = params.baseUrl;
    this._request = axios.create({
      auth: { username, password },
    });
  }
  listAllChannels() {
    return this._request({
      method: "GET",
      url: `${this._baseUrl}/channels`,
    });
  }
  originate(params) {
    const {
      endpoint,
      extension,
      context,
      priority,
      label,
      app,
      appArgs,
      callerId,
      timeout = 30,
      channelId,
      otherChannelId,
      originator,
      formats,
      variables,
    } = params;
    return this._request({
      method: "POST",
      url: `${this._baseUrl}/channels`,
      params: {
        endpoint,
        extension,
        context,
        priority,
        label,
        app,
        appArgs,
        callerId,
        timeout,
        channelId,
        otherChannelId,
        originator,
        formats: [].concat(formats).join(","),
      },
      data: { variables },
    });
  }
  create(params) {
    const {
      endpoint,
      app,
      appArgs,
      channelId,
      otherChannelId,
      originator,
      formats,
    } = params;

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/channels/create`,
      params: {
        endpoint,
        app,
        appArgs,
        channelId,
        otherChannelId,
        originator,
        formats: [].concat(formats).join(","),
      },
    });
  }
  get(params) {
    const { channelId } = params;
    const id = encodeURIComponent(channelId);

    return this._request({
      method: "GET",
      url: `${this._baseUrl}/channels/${id}`,
    });
  }

  originateWithId(params) {
    const {
      channelId,
      endpoint,
      extension,
      context,
      priority,
      label,
      app,
      appArgs,
      callerId,
      timeout = 30,
      otherChannelId,
      originator,
      formats,
      variables,
    } = params;

    const id = encodeURIComponent(channelId);

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/channels/${id}`,
      params: {
        endpoint,
        extension,
        context,
        priority,
        label,
        app,
        appArgs,
        callerId,
        timeout,
        otherChannelId,
        originator,
        formats: [].concat(formats).join(","),
      },
      data: { variables },
    });
  }
  destroy(params) {
    const { channelId, reason } = params;
    const id = encodeURIComponent(channelId);

    return this._request({
      method: "DELETE",
      url: `${this._baseUrl}/channels/${id}`,
      params: { reason },
    });
  }
  continueInDialplan(params) {
    const { channelId, context, extension, priority, label } = params;
    const id = encodeURIComponent(channelId);

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/channels/${id}/continue`,
      params: { context, extension, priority, label },
    });
  }
  ring(params) {
    const { channelId } = params;
    const id = encodeURIComponent(channelId);

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/channels/${id}/ring`,
    });
  }
  stop(params) {
    const { channelId } = params;
    const playbackId = encodeURIComponent(params.playbackId);
    return this._request({
      method: "POST",
      url: `${this._baseUrl}/channels/${channelId}/play/${playbackId}`,
    });
  }
  sendDTMF(params) {
    const {
      channelId,
      dtmf,
      before = 0,
      between = 100,
      duration = 100,
      after = 0,
    } = params;
    const id = encodeURIComponent(channelId);

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/channels/${id}/dtmf`,
      params: { dtmf, before, between, duration, after },
    });
  }
  hold(params) {
    const { channelId } = params;
    const id = encodeURIComponent(channelId);

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/channels/${id}/hold`,
    });
  }

  play(params) {
    const {
      channelId,
      media,
      lang,
      offsetms = 0,
      skipms = 3000,
      playbackId,
    } = params;
    const id = encodeURIComponent(channelId);

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/channels/${id}/play`,
      params: {
        media: [].concat(media).join(","),
        lang,
        offsetms,
        skipms,
        playbackId,
      },
    });
  }

  playWithId(params) {
    const {
      channelId,
      playbackId,
      media,
      lang,
      offsetms = 0,
      skipms = 3000,
    } = params;
    const id = encodeURIComponent(channelId);
    const playId = encodeURIComponent(playbackId);
    return this._request({
      method: "POST",
      url: `${this._baseUrl}/channels/${id}/play/${playId}`,
      params: {
        media: [].concat(media).join(","),
        lang,
        offsetms,
        skipms,
      },
    });
  }

  record(params) {
    const {
      channelId,
      name,
      format,
      maxDurationSeconds = 0,
      maxSilenceSeconds = 0,
      ifExists = "fail",
      beep = true,
      terminateOn = "none",
    } = params;
    const id = encodeURIComponent(channelId);

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/channels/${id}/record`,
      params: {
        name,
        format,
        maxDurationSeconds,
        maxSilenceSeconds,
        ifExists,
        beep,
        terminateOn,
      },
    });
  }
  snoopChannel(params) {
    const {
      channelId,
      app,
      spy = "none",
      whisper = "none",
      appArgs,
      snoopId,
    } = params;
    const id = encodeURIComponent(channelId);

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/channels/${id}/snoop`,
      params: { app, spy, whisper, appArgs, snoopId },
    });
  }
  snoopChannelWithId(params) {
    const {
      channelId,
      snoopId,
      app,
      spy = "none",
      whisper = "none",
      appArgs,
    } = params;
    const id = encodeURIComponent(channelId);
    const sid = encodeURIComponent(snoopId);

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/channels/${id}/snoop/${sid}`,
      params: { app, spy, whisper, appArgs },
    });
  }
  dial(params) {
    const { channelId, caller, timeout } = params;
    const id = encodeURIComponent(channelId);

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/channels/${id}/dial`,
      params: { caller, timeout },
    });
  }
}

class UseBridgeApi {
  constructor(params) {
    const { username, password } = params;
    this._baseUrl = params.baseUrl;
    this._request = axios.create({
      auth: { username, password },
    });
  }
  list() {
    return this._request({
      method: "GET",
      url: `${this._baseUrl}/bridges`,
    });
  }
  create(params = {}) {
    const { type, name, bridgeId } = params;

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/bridges`,
      params: {
        name,
        bridgeId,
        type: [].concat(type).join(","),
      },
    });
  }

  get(params = {}) {
    const { bridgeId } = params;
    const id = encodeURIComponent(bridgeId);

    return this._request({
      method: "GET",
      url: `${this._baseUrl}/bridges/${id}`,
    });
  }

  destroy(params = {}) {
    const { bridgeId } = params;
    const id = encodeURIComponent(bridgeId);

    return this._request({
      method: "DELETE",
      url: `${this._baseUrl}/bridges/${id}`,
    });
  }

  addChannel(params = {}) {
    const { channel, role, bridgeId } = params;
    const id = encodeURIComponent(bridgeId);

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/bridges/${id}/addChannel`,
      params: {
        channel: [].concat(channel).join(","),
        role,
      },
    });
  }
  removeChannel(params = {}) {
    const { channel, bridgeId } = params;
    const id = encodeURIComponent(bridgeId);

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/bridges/${id}/removeChannel`,
      params: { channel: [].concat(channel).join(",") },
    });
  }
  play(params = {}) {
    const {
      bridgeId,
      media,
      playbackId,
      lang,
      offsetms = 0,
      skipms = 3000,
    } = params;

    const id = encodeURIComponent(bridgeId);

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/bridges/${id}/play`,
      params: {
        media: [].concat(media).join(","),
        lang,
        offsetms,
        skipms,
        playbackId,
      },
    });
  }
  playWithId(params = {}) {
    const {
      bridgeId,
      media,
      playbackId,
      lang,
      offsetms = 0,
      skipms = 3000,
    } = params;
    const id = encodeURIComponent(bridgeId);
    const playId = encodeURIComponent(playbackId);

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/bridges/${id}/play/${playId}`,
      params: {
        media: [].concat(media).join(","),
        lang,
        offsetms,
        skipms,
      },
    });
  }

  record(params = {}) {
    const {
      bridgeId,
      name,
      format = "wav",
      maxDurationSeconds = 0,
      maxSilentSeconds = 0,
      ifExists = "fail",
      beep = true,
      terminateOn = "none",
    } = params;
    const id = encodeURIComponent(bridgeId);

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/bridges/${id}/record`,
      params: {
        name,
        format,
        maxDurationSeconds,
        maxSilentSeconds,
        ifExists,
        beep,
        terminateOn,
      },
    });
  }

  startMusicOnHold(params = {}) {
    const { bridgeId, mohClass } = params;
    const id = encodeURIComponent(bridgeId);

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/bridges/${id}/moh`,
      params: { mohClass },
    });
  }

  stopMusicOnHold(params = {}) {
    const { bridgeId } = params;
    const id = encodeURIComponent(bridgeId);

    return this._request({
      method: "DELETE",
      url: `${this._baseUrl}/bridges/${id}/moh`,
    });
  }
}

// class UseWebsocket {
//   constructor(params) {
//     this._username = params.username;
//     this._password = params.password;
//     this._ariUrl = `ws://127.0.0.1:8088/ari/events?api_key=${this._username}:${this._username}&app=hello-world`;
//   }

//   connect(some) {
//     const ws = new WebSocket(this._ariUrl);
//     let receivedData = [];

//     ws.on("open", () => {
//       console.log("websocket connected successfully");
//       some();
//     });
//     ws.on("message", async (data) => {
//       this.maindata = JSON.parse(data);
//       // console.log(this.maindata);
//       receivedData = this.maindata;
//       return receivedData;
//     });
//     ws.on("error", (e) => {
//       console.log("some error occurred", e);
//     });
//   }
// }
class UsePlaybackApi {
  constructor(params) {
    const { username, password } = params;
    this._baseUrl = params.baseUrl;
    this._request = axios.create({
      auth: { username, password },
    });
  }
  get(params) {
    const { playbackId } = params;
    const id = encodeURIComponent(playbackId);

    return this._request({
      method: "GET",
      url: `${this._baseUrl}/playbacks/${id}`,
    });
  }
  stop(params) {
    const { playbackId } = params;
    const id = encodeURIComponent(playbackId);

    return this._request({
      method: "DELETE",
      url: `${this._baseUrl}/playbacks/${id}`,
    });
  }
  control(params) {
    const { playbackId, operation } = params;
    const id = encodeURIComponent(playbackId);

    return this._request({
      method: "POST",
      url: `${this._baseUrl}/playbacks/${id}/control`,
      params: { operation },
    });
  }
}

module.exports = { UseBridgeApi, UseChannelApi, UsePlaybackApi };
