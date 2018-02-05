'use strict';

module.exports = function(err, res) {
  let msg = err.message.toLowerCase();

  switch(true) {
    case msg.includes('path error'): return res.status(404).send(`${err.name}: ${err.message}`);
    case msg.includes('path error'): return res.status(404).send(`${err.name}: ${err.message}`);
    case msg.includes('path error'): return res.status(404).send(`${err.name}: ${err.message}`);
    case msg.includes('path error'): return res.status(404).send(`${err.name}: ${err.message}`);
    case msg.includes('path error'): return res.status(404).send(`${err.name}: ${err.message}`);
  }
}