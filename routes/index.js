const express = require('express');
const TabsController = require('../controllers/TabsController')

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Tabs Api'
    });
})

router.post('/tabs', TabsController.createTab);
router.put('/tabs/:tabId', TabsController.updateTab);
router.get('/tabs', TabsController.getTabs);
router.delete('/tabs/:tabId', TabsController.deleteTab);


module.exports = router;