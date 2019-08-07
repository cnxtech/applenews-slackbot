const { Router } = require('express');
const router = Router();

const { statusBuilder, notification } = require('./controllers');

router.get('/status', statusBuilder);
router.post('/notification', notification);

module.exports = router;
