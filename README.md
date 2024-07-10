# bajo-mqtt

![GitHub package.json version](https://img.shields.io/github/package-json/v/ardhi/bajo-mqtt) ![NPM Version](https://img.shields.io/npm/v/bajo-mqtt)

> <br />**Attention**: I do NOT accept any pull request at the moment, thanks!<br /><br />

MQTT binding for [Bajo Framework](https://github.com/ardhi/bajo). Require [Bajo Emitter](https://github.com/ardhi/bajo-emitter) to work correctly.

## Installation

Goto your ```<bajo-base-dir>``` and type:

```bash
$ npm install bajo-mqtt
```

Now open your ```<bajo-data-dir>/config/.plugins``` and put ```bajo-mqtt``` in it
. Order doesn't matter here, but you should put it below ```bajo-emitter```:

```
...
bajo-emitter
bajo-mqtt
...
```

## Configuration

Open/create ```<bajo-data-dir>/config/bajoMqtt.json```:

| Key | Type | Required | Default | Description |
| --- | ---- | -------- | ------- | ----------- |
| ```connections``` | ```array``` | no | ```[]``` | Define one or more connections to your MQTT Broker |
| &nbsp;&nbsp;```name``` | ```string``` | no | ```default``` | Connection name, must be unique among all your connections |
| &nbsp;&nbsp;```url``` | ```string``` | yes || Url to your MQTT Broker, e.g: ```mqtt://localhost``` |
| &nbsp;&nbsp;```broadcast``` | ```boolean``` | no | ```false``` | Incoming messages are broadcastable by ```bajoEmitter``` |
| &nbsp;&nbsp;```options``` | ```object``` | no || Connection options, see [github.com/mqttjs/MQTT.js](github.com/mqttjs/MQTT.js) |
| ```subscriptions``` | ```array``` | no | ```[]``` | Define one or more subscriptions within your connections |
| &nbsp;&nbsp;```name``` | ```string``` | no | ```default``` | Subscription name, must be unique among all your subscription |
| &nbsp;&nbsp;```connection``` | ```string``` | yes || Connection name, must be one of defined connections above |
| &nbsp;&nbsp;```topic``` | ```string``` | yes || MQTT topic to subscribe into |


Example:

```json
{
  "connections": [{
    "name": "local",
    "url": "mqtt://localhost",
    "broadcast": true
  }, {
    "name": "remote",
    "url": "mqtt://remotebroker.domain.com",
    "options": {
      "username": "guest",
      "password": "SuperSecret"
    }
  }],
  "subscriptions": [{
    "name": "sensor",
    "connection": "local",
    "topic": "sensor/data/#"
  }]
}
```

## License

[MIT](LICENSE)