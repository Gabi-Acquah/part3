const express = require('express')
const app = express()
const cors = require('cors')
//middleware
app.use(express.json())
app.use(cors())
const requestlogger = (req, res, next)=>{
    console.log('METHOD', req.method)
    console.log('PATH', req.path)
    console.log('BODy', req.body)
    console.log('--------------')
    next()
}
app.use(requestlogger)
let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

app.get('/', (req, res)=>{
    res.send('<h1>Hello world</h1>')
})
app.get('/api/notes', (req, res)=>{
    res.json(notes)
})
app.get('/api/notes/:id',(req, res)=>{
    const id = Number(req.params.id)
    const note = notes.find(n=>n.id === id)
    if (note){
        res.json(note)
    }else{
        res.status(404).end()
    }
})
app.delete('/api/notes/:id',(req,res)=>{
    const id = Number(req.params.id)
    const note = notes.filter(n=>n.id !== id)
    res.status(204).end()

})
const genrateId = ()=>{
    const maxID = notes.length > 1
    ? Math.max(...notes.map(n=>n.id))
    :0
    return maxID + 1
}
app.post('/api/notes', (req, res) => {
    const body = req.body  

    if(!body.content){
        res.status(404).json({
            error:'missing content'
        })
    }
    const note = {
        content: body.content,
        important:Boolean(body.important) || false,
        id: genrateId()
    }
    notes = notes.concat(note)
    res.json(note)
    
})



const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`server running on port: ${PORT}`)
})