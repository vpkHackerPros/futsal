const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const csv = require('csv-parser')
const net = require('net')

const Commands = require('./.mjs')
import Commands from './VizProjectSpecificCommands'

const app = express()
const port = 4545
app.use(bodyParser.json())

const VIZ_port = 6100
const VIZ_ip = 'localhost'
const client = new net.Socket()
client.connect(VIZ_port, VIZ_ip, () => console.log(`connected to ${VIZ_ip}:${VIZ_port}`))


let lineupA = []
let lineupB = []
let gameData = [{
  trenerImeA: '',
  trenerPriimekA: '',
  trenerImeB: '',
  trenerPriimekB: '',
  sodnik1: '',
  country1: '',
  sodnik2: '',
  country2: '',
  sodnik3: '',
  country3: '',
  sodnik4: '',
  country4: '',
  komentator: '',
  kraj: '',
  datum: '',
  teamA: '',
  teamB: '',
  logoA: '',
  logoB: ''
}]
let clockPath = 'C:\\Users\\kllam\\Desktop\\Clock.txt'
let clock = []
let clockIsIn = false
let exitCommand = ''
let score = [0,0]
let izkIn = [0,0]
let currentPlayer = {
  number: '10',
  surname: 'surko',
  isTeamA: 0,
  goalsBefore: 0,
  goals: 0,
  matches: 0
}
let matchscoreIsIn = false
let countdownIsIn = false
let foulsIn = [0,0]



const playGraphics = (graphics, delays) => {
  graphics.map((gfx, i) => {
    setTimeout( () => {
      console.log(gfx)
      client.write(gfx)
    }, delays[i])
  })
}

const playSingleGraphic = (gfx) => {
  client.write(gfx)
}

class Viz {
  static project = 'CHL_FUTSAL'
  static setScene         = (project, scene)  => `0 RENDERER SET_OBJECT SCENE*${project}/PLAYOUT/${scene}\0`
  static setTextBasic     = (container, text) => `0 RENDERER*TREE*$${container}*GEOM*TEXT SET ${text}\0`
  static setTextPlugin    = (container, text) => `0 RENDERER*TREE*$${container}*FUNCTION*TFxWrite*Text SET ${text}\0`
  static animationStart   = (animationName)   => `0 RENDERER*STAGE*DIRECTOR*$${animationName} START\0`
  static animationToStart = (animationName)   => `0 RENDERER*STAGE*DIRECTOR*$${animationName} SHOW START\0`
  static animationToEnd   = (animationName)   => `0 RENDERER*STAGE*DIRECTOR*$${animationName} SHOW END\0`
  static setActive        = (container)       => `0 RENDERER*TREE*$${container}*GEOM*ACTIVE SET 1\0`
  static setNonActive     = (container)       => `0 RENDERER*TREE*$${container}*GEOM*ACTIVE SET 0\0`
  static setLogo          = (container, path) => `0 RENDERER*TREE*$${container}*IMAGE SET IMAGE*${Viz.project}/LOGO/${path} 0\0`
}



  const foulStackA_IN = [
    '',
    Viz.animationStart('HOME_FOUL_1_IN'),
    Viz.animationStart('HOME_FOUL_2_IN'),
    Viz.animationStart('HOME_FOUL_3_IN'),
    Viz.animationStart('HOME_FOUL_4_IN'),
    Viz.animationStart('HOME_BONUS_IN') + Viz.animationStart('HOME_FOUL_5_IN')
  ]
  const foulStackB_IN = [
    //Viz.animationStart('HOME_FOUL_1_IN'),
    '',
    Viz.animationStart('AWAY_FOUL_6_IN'),
    Viz.animationStart('AWAY_FOUL_7_IN'),
    Viz.animationStart('AWAY_FOUL_8_IN'),
    Viz.animationStart('AWAY_FOUL_9_IN'),
    Viz.animationStart('AWAY_BONUS_IN') + Viz.animationStart('AWAY_FOUL_10_IN')
  ]
  const foulStackA_OUT = [
    //Viz.animationStart('HOME_FOUL_1_OUT'),
    '',
    Viz.animationStart('AWAY_FOUL_6_IN'),
    Viz.animationStart('HOME_FOUL_1_OUT'),
    Viz.animationStart('HOME_FOUL_2_OUT'),
    Viz.animationStart('HOME_FOUL_3_OUT'),
    Viz.animationStart('HOME_FOUL_4_OUT'),
    Viz.animationStart('HOME_BONUS_OUT') + Viz.animationStart('HOME_FOUL_5_OUT')
  ]
  const foulStackB_OUT = [
    //Viz.animationStart('HOME_FOUL_1_OUT'),
    Viz.animationStart('AWAY_FOUL_6_OUT'),
    Viz.animationStart('AWAY_FOUL_7_OUT'),
    Viz.animationStart('AWAY_FOUL_8_OUT'),
    Viz.animationStart('AWAY_FOUL_9_OUT'),
    Viz.animationStart('AWAY_BONUS_OUT') + Viz.animationStart('AWAY_FOUL_10_OUT')
  ]






fs.watch(clockPath, (event, filename) => {
  if (filename) {
    fs.readFile(clockPath, 'utf8' , (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      clock = data.split('\r\n')
      if (clockIsIn) playSingleGraphic(Commands.updateTime())
      if (matchscoreIsIn) playSingleGraphic(Commands.updateTimeMatchScore())
      if (countdownIsIn)  playSingleGraphic(Commands.updateCountdown())
    })
  }
});

const readCsv = async (path) => {
  let arr = []
  try {
  await fs.createReadStream(path)
    .pipe(csv())
    .on('data', (data) => arr.push(data))
    .on('end', () => {
      console.log(arr);
    });
  } catch (err) {
    console.log(err)
  }
  return arr
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/score/:a/:b', (req, res) => {
  res.send('score')
  score = [req.params.a, req.params.b]
  playSingleGraphic(Commands.updateScoreClock())
})
app.get('/GFX_out', (req, res) => {
  res.send('GFX_lineup')
  playSingleGraphic(exitCommand)
  matchscoreIsIn = false
  countdownIsIn = false
})

app.get('/GFX_countdown', (req, res) => {
  res.send('game_id')
  playSingleGraphic(Commands.countdown())
  exitCommand = Commands.countdown_OUT()
})
app.get('/GFX_game_id', (req, res) => {
  res.send('game_id')
  playSingleGraphic(Commands.matchId())
  exitCommand = Commands.matchId_OUT()
})
app.get('/GFX_commentator', (req, res) => {
  res.send('GFX_lineup')
  playSingleGraphic(Commands.commentator())
  exitCommand = Commands.commentator_OUT()
})
app.get('/GFX_officials', (req, res) => {
  res.send('GFX_lineup')
  playSingleGraphic(Commands.officials())
  exitCommand = Commands.officials_OUT()
})
app.get('/GFX_timeout/:team', (req, res) => {
  res.send('GFX_lineup')
  playSingleGraphic(Commands.timeout(req.params.team == 0 ? gameData[0].logoA : gameData[0].logoB))
  exitCommand = Commands.timeout_OUT()
})
app.get('/GFX_lineupA', (req, res) => {
  res.send('GFX_lineup')
  playSingleGraphic(Commands.lineupA())
  exitCommand = Commands.lineup_OUT()
})
app.get('/GFX_lineupB', (req, res) => {
  res.send('GFX_lineup')
  playSingleGraphic(Commands.lineupB())
  exitCommand = Commands.lineup_OUT()
})
app.get('/GFX_clock_IN/:time', (req, res) => { //time => 0 ali 1
  res.send('clock_IN')
  playSingleGraphic(Commands.clock(req.params.time))
  clockIsIn = true
})
app.get('/GFX_clock_OUT', (req, res) => {
  res.send('clock_OUT')
  playGraphics(Commands.clock_OUT(), [10, 500])
  clockIsIn = false
})
app.get('/GFX_izk1_IN', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.izk1())
})
app.get('/GFX_izk1_OUT', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.izk1_OUT())
})
app.get('/GFX_izk2_IN', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.izk2())
})
app.get('/GFX_izk2_OUT', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.izk2_OUT())
})
app.get('/GFX_izk3_IN', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.izk3())
})
app.get('/GFX_izk3_OUT', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.izk3_OUT())
})
app.get('/GFX_izk4_IN', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.izk4())
})
app.get('/GFX_izk4_OUT', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.izk4_OUT())
})
app.get('/GFX_izk4_OUT', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.izk4_OUT())
})
app.get('/GFX_coach/:team', (req, res) => {
  res.send('coach_IN')
  playSingleGraphic(Commands.coach(req.params.team))
  exitCommand = Commands.coach_OUT()
})
app.get('/foulsInHalf/:a/:b', (req, res) => {
  res.send('coach_IN')
  const foulsInHalf = [req.params.a, req.params.b]
  playSingleGraphic(Commands.foulsClock(foulsInHalf))
})


//PODPISI IZ URE
app.post('/podpis', (req, res) => {
  res.send('podpis')
  const name = req.body.name
  const number = req.body.number
})

app.get('/GFX_player', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.playerSig())
  exitCommand = Commands.playerSig_OUT()
})
app.get('/GFX_player_info', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.playerInfo())
  exitCommand = Commands.playerInfo_OUT()
})
app.get('/GFX_ball_possesion/:a/:b', (req, res) => {
  res.send('ball possesion')
  playSingleGraphic(Commands.ballPossesion(req.params.a, req.params.b))
  exitCommand = Commands.ballPossesion_OUT()
})
app.get('/GFX_yellow', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.yellow())
  exitCommand = Commands.yellow_OUT()
})
app.get('/GFX_double_yellow', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.doubleYellow())
  exitCommand = Commands.doubleYellow_OUT()
})
app.get('/GFX_red', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.red())
  exitCommand = Commands.red_OUT()
})
app.post('/statistics', (req, res) => {
  res.send('statistics')
  const data = req.body
  playSingleGraphic(Commands.statistics(data))
  exitCommand = Commands.statistics_OUT()
})
app.post('/GFX_matchScore', (req, res) => {
  res.send('GFX_matchScore')
  const data = req.body
  playSingleGraphic(Commands.matchScore(data))
  exitCommand = Commands.matchScore_OUT(data)
})
app.post('/GFX_big_shootout', (req, res) => {
  res.send('shootout')
  const data = req.body
  console.log(data)
  playSingleGraphic(Commands.shootout(data))
  exitCommand = Commands.shootout_OUT()
})
app.post('/GFX_big_shootout_update', (req, res) => {
  res.send('shootout')
  const data = req.body
  console.log(data)
  playSingleGraphic(Commands.updateShootout(data))
  exitCommand = Commands.shootout_OUT()
})
app.post('/GFX_small_shootout', (req, res) => {
  res.send('shootout')
  const data = req.body
  console.log(data)
  playSingleGraphic(Commands.shootoutSmall(data))
  exitCommand = Commands.shootout_small_OUT()
})
app.post('/GFX_small_shootout_update', (req, res) => {
  res.send('shootout')
  const data = req.body
  console.log(data)
  playSingleGraphic(Commands.updateShootoutSmall(data))
  exitCommand = Commands.shootout_small_OUT()
})

app.get('/GFX_schedule', (req, res) => {
  res.send('schedule')
  playSingleGraphic(Commands.schedule())
  exitCommand = Commands.schedule_OUT()
})
app.get('/GFX_nextMatch', (req, res) => {
  res.send('next match')
  playSingleGraphic(Commands.nextMatch())
  exitCommand = Commands.nextMatch_OUT()
})
app.get('/GFX_multi_flash', (req, res) => {
  res.send('multi flash')
  playSingleGraphic(Commands.multiFlash())
  exitCommand = Commands.multiFlash_OUT()
})


app.post('/currentPlayer', (req, res) => {
  res.send('current player')
  console.log(req.body)
  currentPlayer = req.body
})
app.get('/resetFouls', (req, res) => {
  res.send('multi flash')
  foulsIn=[0,0]
})
app.post('/lineupA', (req, res) => {
  res.send('lineup a')
   readCsv(req.body.path)
   .then(data => lineupA = data)
})
app.get('/lineupA', (req, res) => {
  res.json({team: lineupA})
})
app.post('/lineupB', (req, res) => {
  res.send('lineup b')
   readCsv(req.body.path)
   .then(data => lineupB = data)
})
app.get('/lineupB', (req, res) => {
  res.json({team: lineupB})
})
app.post('/gameData', (req, res) => {
  res.send('game data')
   readCsv(req.body.path)
   .then(data => gameData = data)
})
app.post('/clock', (req, res) => {
  res.send('lineup a')
  clockPath = req.body.path
})
app.get('/clock', (req, res) => {
  res.json({clock})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
