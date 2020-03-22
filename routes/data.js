var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";

router.get('/', function(req, res) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function(err, client) {
        client.db('data').collection("api").findOne(key, function(err, r) {
            client.close();
            res.send(r);
        });
    });
});

router.get('/:id', function(req, res) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function(err, client) {
        let key = {}
        key[req.params.id] = {
            $regex: ".*"
        }
        client.db('data').collection("api").findOne(key, function(err, r) {
            client.close();
            res.send(r);
        });
    });
});

router.post('/', function(req, res) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function(err, client) {
        let obj = req.body;
        client.db('data').collection("api").insertOne(obj, function(err, r) {
            client.close();
            res.send(r);
        });
    });
});

router.put('/:id', function(req, res) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function(err, client) {
        let obj = req.body;
        let key = {}
        key[req.params.id] = {
            $regex: ".*"
        }
        client.db('data').collection("api").findOneAndUpdate(key, {$set: obj},
            {}, function(err, r) {
            client.close();
            res.send(r);
        });
    });
});

router.delete('/:id', function(req, res) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function(err, client) {
        let key = {}
        key[req.params.id] = {
            $regex: ".*"
        }
        client.db('db').collection("restapi").findOneAndDelete(key, function(err, r) {
            client.close();
            res.send(r);
        });
    });
});

module.exports = router;