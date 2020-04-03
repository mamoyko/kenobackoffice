import express from 'express';
import encode from 'nodejs-base64-encode';
import PlayerModel from '../api/modules/player/player.model';
import BetModel from '../api/modules/bet/bet.model';
const http = require("http").Server(app);
const app = express();
const io = require("socket.io")(http);



io.on('connect', (socket) => {


    socket.on('disconnect',() => {
        console.log('user disconnected');
    });


    //this if for temporary auth, fucking development timeline
    
    socket.emit('test connection', "connecting to web sockets")

    socket.on('join game', async (data) => {
        try {
            let base64 = await encode.decode(data, 'base64');
            let playerData = await PlayerModel.findById(base64);
            socket.emit('join game', playerData);
        } catch(err) {
            socket.emit('join game', {err: true, message: 'invalid player'});
        }
    });

    socket.on('bet game', async (data) => {
        try {
            let playerData = await PlayerModel.findById(data.player);
            if (playerData){
                let bet = data;
                bet.playerBalance = playerData.balance;
                let newBet = await BetModel.create(bet);
                if (newBet.WinAmount > 0){
                    playerData.balance = playerData.balance + newBet.WinAmount;
                }

                if (bet.LoseAmount > 0) {
                    playerData.balance = playerData.balance - newBet.LoseAmount;
                }

                let newPlayer = await PlayerModel.findOneAndUpdate({_id : newBet.player}, playerData);
                let getPlayer = await PlayerModel.findById(newPlayer._id);
                socket.emit('bet game', getPlayer.balance);
            }

        } catch(err){
            socket.emit('bet game', {err: true, message: 'err on this socket'});
        }
    });

});


http.listen(3006, function() {
    console.log("I am listening on 3006 for socket");
});