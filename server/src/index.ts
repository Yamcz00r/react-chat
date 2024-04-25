import express from 'express';
import auth from './routes/auth';
import messages from './routes/messages';
const app = express();
app.use(express.json())
app.use('/auth', auth);
app.use('/message', messages);

app.listen(8080, () => {
    console.log('Server is running')
})