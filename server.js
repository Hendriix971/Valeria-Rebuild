const WebSocket = require('ws')
const http = require('http')
const fs = require('fs')
const path = require('path')

// Sert le client HTML
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const html = fs.readFileSync(path.join(__dirname, 'client.html'), 'utf8')
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(html)
  }
})

// WebSocket sur le même port
const wss = new WebSocket.Server({ server })
const players = {}
const MAP_SIZE = 5

function broadcast(msg) {
  const data = JSON.stringify(msg)
  wss.clients.forEach((c) => {
    if (c.readyState === WebSocket.OPEN) c.send(data)
  })
}

wss.on('connection', (ws) => {
  const id = Math.random().toString(36).slice(2, 8)
  // Place le joueur sur une case aléatoire libre
  let x, y
  do {
    x = Math.floor(Math.random() * MAP_SIZE)
    y = Math.floor(Math.random() * MAP_SIZE)
  } while (Object.values(players).some(p => p.x === x && p.y === y))

  players[id] = { x, y }

  // Envoie l'état complet au nouveau joueur
  ws.send(JSON.stringify({ type: 'init', players, yourId: id, mapSize: MAP_SIZE }))
  broadcast({ type: 'join', id, x, y })

  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw)
      if (msg.type === 'move') {
        const p = players[id]
        if (!p) return
        const nx = p.x + msg.dx
        const ny = p.y + msg.dy
        if (nx >= 0 && nx < MAP_SIZE && ny >= 0 && ny < MAP_SIZE) {
          // Vérifie que la case est libre
          if (!Object.values(players).some(p2 => p2.x === nx && p2.y === ny && p2 !== p)) {
            p.x = nx
            p.y = ny
            broadcast({ type: 'move', id, x: nx, y: ny })
          }
        }
      }
    } catch (_) {}
  })

  ws.on('close', () => {
    delete players[id]
    broadcast({ type: 'leave', id })
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`)
})
