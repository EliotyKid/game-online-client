function emit(packet) {
  GMS_API.send_async_event_social(packet)
}

class ColyseusClient {
  static list = []
  static id_num = 0
  
  constructor(address) {
    this.id = ColyseusClient.id_num++
    this.socket = new Colyseus.Client(address)
    this.room_list = new Map()
  
    this.room_handler = (room) => {
      // room.state.onChange
      room.onMessage("*", (event, message) => {
        emit({
          emitter: "Colyseus",
          type: "message",
          id: this.id,
          room: {
            id: room.roomId,
            name: room.name,
          },
          event,
          message
        })
      })

      room.onError((code, message) => {
        emit({
          emitter: "Colyseus",
          type: "error",
          id: this.id,
          room: {
            id: room.roomId,
            name: room.name,
          },
          code,
          message,
          command: "server_error"
        })
      })

      room.onLeave((code) => {
        if (!this.room_list.get(room.roomId)) emit({
          emitter: "Colyseus",
          type: "error",
          id: this.id,
          room: {
            id: room.roomId,
            name: room.name,
          },
          code,
          message: "room not found",
          command: "leave_room"
        })

        room.removeAllListeners()
        this.room_list.delete(room.roomId)
        emit({
          emitter: "Colyseus",
          type: "leave_room",
          id: this.id,
          room: {
            id: room.roomId,
            name: room.name,
          }
        })
      })

      this.room_list.set(room.roomId, room)
      emit({
        emitter: "Colyseus",
        type: "new_room",
        id: this.id,
        room: {
          id: room.roomId,
          name: room.name,
          session_id: room.sessionId,
        }
      })
    }
    ColyseusClient.list.push(this)
  }
}

function CreateSocket(address){
  return new ColyseusClient(address).id
}

function GetRooms(id,name = undefined){
  const client = ColyseusClient.list.find(c => c.id === id);
  if (!client) {
      emit({
      emitter: "Colyseus",
      type: "error",
      id,
      message: `client ${id} not found`,
      command: "get_rooms"
    })
    return
  }
  
  client.socket.getAvaliableRooms(name).then(room_list => {
    emit({
      emitter: "Colyseus",
      type: "room_list",
      id,
      room_list
    })
  }).catch(err => {
    emit({
      emitter: "Colyseus",
      type: "error",
      id,
      message: `failed to get rooms: ${err.message}`,
      command: "get_rooms"
    })
  })
}

function JoinById(id, room_id, options){
  const client = ColyseusClient.list.find(c => c.id === id);
  if (!client) {
      emit({
      emitter: "Colyseus",
      type: "error",
      id,
      message: `client ${id} not found`,
      command: "join_room_by_id"
    })
    return
  }

  client.socket.joinById(room_id, JSON.parse(options)).then(client.room_handler).catch(err => {
    emit({
      emitter: "Colyseus",
      type: "error",
      id,
      room: {
        id: room_id,
        name: "",
      },
      message: `failed to join room by id: ${err.message}`,
      command: "join_room_by_id",
      code: err.code || 500
    })
  })
}

function Join(id, room_name, options){
  const client = ColyseusClient.list.find(c => c.id === id);
  if (!client) {
      emit({
      emitter: "Colyseus",
      type: "error",
      id,
      message: `client ${id} not found`,
      command: "join_room_by_id"
    })
    return
  }

  client.socket.join(room_name, JSON.parse(options)).then(client.room_handler).catch(err => {
    emit({
      emitter: "Colyseus",
      type: "error",
      id,
      message: `failed to join room by name: ${err.message}`,
      command: "join_room_by_name",
      code: err.code
    })
  })
}

function ConsumeSeat(id,seat){
  const client = ColyseusClient.list.find(c => c.id === id);
  if (!client) {
      emit({
      emitter: "Colyseus",
      type: "error",
      id,
      message: `client ${id} not found`,
      command: "consume_seat"
    })
    return
  }

  client.socket.consumeSeatReservation(JSON.parse(seat)).then(client.room_handler).catch(err => {
    emit({
      emitter: "Colyseus",
      type: "error",
      id,
      room: {
        id: room_id,
        name: "",
      },
      message: `failed to consume seat: ${err.message}`,
      command: "consume_seat",
      code: err.code || 500
    })
  })
}

function SendMessage(id, room_id, event, message) {
  const client = ColyseusClient.list.find(c => c.id === id);
  if (!client) {
      emit({
      emitter: "Colyseus",
      type: "error",
      id,
      message: `client ${id} not found`,
      command: "send_message"
    })
    return
  }

  const room = client.room_list.get(room_id);
  if (!room) {
    emit({
      emitter: "Colyseus",
      type: "error",
      id,
      room: {
        id: room_id,
        name: "",
      },
      message: `room ${room_id} not found`,
      command: "send_message"
    })
    return
  }

  room.send(event, message)
}

function LeaveRoom(id, room_id){
  const client = ColyseusClient.list.find(c => c.id === id);
  if (!client) {
      emit({
      emitter: "Colyseus",
      type: "error",
      id,
      message: `client ${id} not found`,
      command: "leave_room"
    })
    return
  }

  const room = client.room_list.get(room_id);
  if (!room) {
    emit({
      emitter: "Colyseus",
      type: "error",
      id,
      room: {
        id: room_id,
        name: "",
      },
      message: `room ${room_id} not found`,
      command: "leave_room"
    })
    return
  }

  room.socket.leave()
}

function GetToken() {
  const token = localStorage.getItem("authToken");
  return token ? token : "sadsdasdasd";
}