import pool from "./config.js";


const getAllEnvelopes = (req, res) => {
    pool.query('SELECT * FROM envelopes', (error, results) => {
        if (error) {
            throw res.send(error)

        } else {
            res.status(200).json({ data: results.rows })

        }
    });
}

const addEnvelope = (req, res) => {

    const title = req.body.title;
    const budget = req.body.budget;

    pool.query('INSERT INTO envelopes(title,budget) VALUES($1,$2)', [title, budget], (error, results) => {
        if (!error) {
            return res.status(200).send("Successfully added " + title)
        }
        throw res.send(error)
    });
}
const updateEnvelope = (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const budget = req.body.budget;
    pool.query('UPDATE envelopes SET title=$1,budget=$2 WHERE id=$3', [title, budget, id], (error, results) => {
        if (!error) {
            return res.send(`envelope with id ${id} updated successfully`);
        }
        throw res.status(500).send(error)
    });
}
const deleteEnvelope = (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM envelopes WHERE id=$1', [id], (error, results) => {
        if (!error) {
            return res.send(`envelope with id ${id} deleted successfully`);
        }
        throw res.status(500).send(error)
    });
}

const searchEnvelope = (req, res) => {
    const id = req.params.title;
    pool.query('SELECT * FROM envelopes  WHERE title=$1', [id], (error, results) => {
        if (results.rowCount>0) {
            return res.status(200).json({ data: results.rows });
        }
        if(results.rowCount===0){
            return res.status(404).send(`No Envelope found with title ${id}`)
        }
        throw res.status(500).send(error)
    });
}
const transferEnvelope = async (req, res) => {
    const from = req.params.from;
    const to = req.params.to;
    const budget = req.body.budget;
   

    const fromBudget = await pool.query('SELECT budget ::money::numeric::float8 FROM envelopes WHERE id=$1', [from])

    const toBudget   = await pool.query('SELECT budget ::money::numeric::float8 FROM envelopes WHERE id=$1', [to]);
       
        if(fromBudget.rowCount>0 && toBudget.rowCount>0){
           
            const fb = fromBudget.rows[0]['budget']-budget
            const tb =toBudget.rows[0]['budget']+budget
            
             const updateToBudget = await pool.query('UPDATE envelopes SET budget=$1 WHERE id=$2',[tb,to]);
             const updateFromBudget = await pool.query('UPDATE envelopes SET budget=$1 WHERE id=$2',[fb,from]);
              if(updateToBudget.rowCount>0 && updateFromBudget.rowCount>0){
                  res.status(200).send(` Envelope tansfered successfully`)
              }else{
                res.status(500).send('Could not  update ')
              }
        }else{
            res.status(500).send('bad request')

        }


}


export { getAllEnvelopes, addEnvelope, deleteEnvelope, updateEnvelope, searchEnvelope, transferEnvelope }