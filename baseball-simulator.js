/*
Simulate player with x number of official at bats (default 3) over 162 games.

How many games in a row will that player go with at least one hit per game?
How many games in a row will that player go without getting a hit?

The simulation is based on rolling a 6 sided die. Rolling 1 or 2 is a hit. (.333 avg).
Also try:
8 sided; 1 or 2 is a hit (.250 avg)
8 sided; 1-3 is a hit (.375 avg)
10 sided; 1-3 is a hit (.300 avg)
10 sided; 1-2 is a hit (.200 avg)
10 sided: 1-4 is a hit (.400 avg)
20 sides; 1-7 is a hit (.350 avg) 

Find out from the user:
Ask how many At Bats [abPerGame] the player will have each game or assume 3.

Ask the user to select the player's batting average [bAvg] by giving them these choices (bAvg => {dieNumber}/{hitRange}):
.200 => 10/2
.250 => 8/2
.300 => 10/3
.333 => 6/2
.350 => 20/7
.375 => 8/3
.400 => 10/4
Where die values are [6,8,10,20] and hitRange values are [2,3,4,7]. Dice options should be mapped in key/value pairs. 
-Allow for a manual input in the future.

With that information:
Roll dieNumber abPerGame number of times.
If the number rolled is at least hitRange, then count that as a hit for the game.
Repeat 164 times (the number of games in a major league baseball season).
    -In the future there may be functionality needed to track multiple hits per game.

Report the results:
Show a list with the game # and if there was a hit.
Display a summary that shows the input criteria along with the longest hit streak and slump streak.
Allow the user to rerun the simulation from that results screen.
*/

let runSim = () => {
    const Dice = {
        '200': { 'sides': 10, 'range': 2 },
        '250': { 'sides': 8, 'range': 2 },
        '300': { 'sides': 10, 'range': 3 },
        '333': { 'sides': 6, 'range': 2 },
        '350': { 'sides': 20, 'range': 7 },
        '375': { 'sides': 8, 'range': 3 },
        '400': { 'sides': 10, 'range': 4 }
    }

    const GamesPerSeason = 164
    const ABPerGame = document.querySelector('#at-bats').value
    const BatAvg = document.querySelector('#b-avg').value
    const Seasons = document.querySelector('#seasons').value

    // Keep track of what game # it is.
    let GamesPlayed = 0

    // Keep track of longest streaks.
    let CurrentHitStreak = 0
    let CurrentSlumpStreak = 0
    let LongestHitStreak = 0
    let LongestSlumpStrek = 0

    document.querySelector('.results').style.visibility = 'hidden'

    // Begin Season
    for (let Season = 0; Season < Seasons; Season++) {
        // Begin Game
        for (let Game = 0; Game < GamesPerSeason; Game++) {
            let GotHit = 0

            // Begin At Bat.
            for (let ab = 0; ab < ABPerGame; ab++) {
                GotHit = doAtBat(Dice[BatAvg])

                if (GotHit) {
                    break
                }
            }

            if (GotHit) {
                // If range is hit, increment the hit streak if the previous game had a hit, 
                // otherwise reset the hit streak counter and go to the next game.
                CurrentHitStreak++

                if (CurrentHitStreak > LongestHitStreak) {
                    LongestHitStreak = CurrentHitStreak
                }

                CurrentSlumpStreak = 0 // If a hit, the current hitless streak is broken.
            } else {
                // If the range wasn't matched, increment the hitless streak if the previous 
                // game didn't have a hit, otherwise reset the counter and go to the next game.
                CurrentSlumpStreak++

                if (CurrentSlumpStreak > LongestSlumpStrek) {
                    LongestSlumpStrek = CurrentSlumpStreak
                }

                CurrentHitStreak = 0 // If hitless, the current hit streak is broken.
            }
        }
    }

    // At the end of the "season", report back:
    let Results = document.querySelectorAll('.results')
    Results.forEach(element => {
        element.style.visibility = 'visible'
    })

    // Longest hitting streak and longest slump.
    document.querySelector('#h_srk').innerHTML = LongestHitStreak
    document.querySelector('#s_srk').innerHTML = LongestSlumpStrek
}

let doAtBat = (DiceInfo) =>
    rollDice(DiceInfo)

let rollDice = (Params) =>
    Math.floor((Math.random() * Params['sides']) + 1) < Params['range']

