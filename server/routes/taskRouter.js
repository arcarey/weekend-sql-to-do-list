const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET
router.get("/", (req, res) => {
  let queryText = 'SELECT * FROM tasks ORDER BY "complete";';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
      console.log('GET data from DB');
    })
    .catch((err) => {
      console.log("Error getting data", err);
      res.sendStatus(500);
    });
});

// POST
router.post("/", (req, res) => {
  let queryText = `INSERT INTO tasks (
        "text", "complete")
         VALUES ($1, $2);`;
  let newTask = req.body;
  console.log('req.body.text:', newTask.text, 'req.body.complete:', newTask.complete);
  pool
    .query(queryText, [newTask.text, newTask.complete])
    .then((result) => {
        console.log('sending status');
        res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error adding task");
    });
});

// PUT

router.put("/:id", (req, res) => {
    let id = req.params.id;
    let complete = req.body.complete;
    let queryText = `UPDATE tasks
                        SET "complete" = $1
                        WHERE "id" = $2;`;
    pool
        .query(queryText, [complete, id])
        .then(() => {
            console.log('task complete status changed');
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('error changing complete status:', err);
        });
});

// DELETE
router.delete("/:id", (req, res) => {
    let id = req.params.id;
    let queryText = `DELETE FROM tasks
                        WHERE "id" = $1`
    pool
        .query(queryText, [id])
        .then(() => {
            console.log('task deleted from database');
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('error deleing from database:', err);
        });
});

module.exports = router;
