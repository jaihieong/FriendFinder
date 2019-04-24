// LOAD DATA from friends.js
var friendsData = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
        // friendsData.push(req.body);
        var newFriend = req.body;
        var newScore = newFriend.scores;
        console.log(newFriend);
        console.log(newScore);
        friendsData.push(newFriend);

        
        // I want to compare the newScore against all the scores of friendsData objects
        // compareScore(newScore);

        function compareScore(arrScore) {
            var range = friendsData.length - 1; // avoid the last object which is just added

            var allComparisons =[];
            for (let i = 0; i < range; i++){
                let result = compareTwoScores(arrScore, friendsData[i].scores);
                allComparisons.push(result);
            }
            
            console.log(allComparisons);

            // now pick the friend with the best match meaning least difference in scores
            var bestMatchIndex = 0;
            for (let i = 0; i < allComparisons.length; i++) {
                if (allComparisons[bestMatchIndex] >= allComparisons[i]) {
                    bestMatchIndex = i;
                }
            }
            console.log(bestMatchIndex);

            var bestMatch = friendsData[bestMatchIndex];
            console.log(bestMatch);
            return bestMatch;

        }

        function compareTwoScores(score1, score2) {
            var result = 0;
            
            for (let i = 0; i < score1.length; i++){
                // compare each value of each index
                result += Math.abs(parseInt(score1[i]) - parseInt(score2[i]));
            }
            // console.log(result);
            return result;
        }

        res.json(compareScore(newScore));
        
        
    });
};