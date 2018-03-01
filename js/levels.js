var  levels = [

              // random level generator, just for fun! =)
              // {
              //   trackLayout: generateRandomTrack(40,40),
              //   rows: 40,
              //   cols: 40,
              //   enemyCars: 1,
              //   timeLimit: 1 * 128 * framesPerSecond
              // },
              //Demo Level
           
              { trackLayout: [  5,  5,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  5, 
                                5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 
                                5, 10,  0,  0,  0,  0,  0,  0,  0,  7,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 
                                1, 10,  0, 90,  0, 11,  0,  0,  0,  0,  0,  0,  0,  0, 11,  0,  0,  0,  0,  1, 
                                1, 10,  0,  0,  0,  0,  0,  0, 29,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 
                                1, 10, 50,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 
                                1,  0,  0, 51,  0,  0,  9,  0,  0,  0,  9,  0,  0,  0,  0,  0,  0,  0,  0,  1, 
                                1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 11,  0,  0,  0,  0,  1, 
                                1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10, 10,  0,  0,  0,  0,  0,  0,  1, 
                                1,  0,  0,  0,  0, 11,  0,  0,  0,  0,  0, 10, 10,  0,  0,  0,  0,  0,  0,  1, 
                                1,  0,  3,  0,  0,  0,  0,  9,  0,  9,  0, 10, 10,  0,  0,  0,  0,  0,  0,  1, 
                                1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1
                             ], 
                rows: 12, 
                cols: 20, 
                enemyCars: 1, 
                timeLimit: 1 * 100 * framesPerSecond,
                playerCarAngle : -Math.PI/3,
                overheadSpaceships: 1

              }, 
              //level 1
              { trackLayout:  [ 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 
                                23,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 23,  0,  0,  0, 23, 
                                23,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 51,  0, 23,  0,  2,  0, 23, 
                                23,  0,  0,  0, 23, 23, 23, 23, 23, 23, 23, 23,  0,  0,  0, 23,  0,  0,  0, 23, 
                                23,  0,  0, 23,  5,  5,  5,  5,  5, 23, 23, 23,  0,  0,  0, 23,  0,  0,  0, 23, 
                                23,  0,  0, 23,  5,  5,  5,  5,  5, 23, 23, 23,  0,  0,  0, 23,  0,  0,  0, 23, 
                                23,  0,  0, 23,  5,  5,  5,  5,  5, 23, 23, 23,  0,  0,  0, 23,  0,  0,  0, 23, 
                                23,  0, 29,  4,  5,  5,  5,  5,  5, 23, 23,  4,  8,  8,  8, 23,  0,  0,  0, 23, 
                                23,  0,  0,  8, 23, 23, 23,  0,  0, 23,  0,  0, 29,  0, 23, 23,  0,  0,  0, 23, 
                                23,  0,  0,  8,  0,  0,  0, 23, 23, 23,  0,  0,  0, 23, 23,  0,  0,  0, 23, 23, 
                                23,  0,  0,  8,  0,  0,  0,  0,  0, 23,  0,  0, 23, 23,  0,  0,  0,  0, 23, 23, 
                                23,  0,  0,  8,  0,  0,  0,  0,  0, 23, 90,  0, 23,  0,  0,  0,  0, 23, 23, 23, 
                                23, 23, 23, 23, 23, 23, 23,  0,  0, 23,  0,  0, 23,  0,  29, 0, 23, 23,  5, 23, 
                                23,  7,  0,  0,  0,  0,  0,  0,  0, 23,  0,  0, 23,  0,  0,  0, 23, 23,  5, 23, 
                                23,  0,  0,  0,  0,  0,  0,  0,  0, 23,  0,  0, 23,  0,  0,  0,  0, 23, 23, 23, 
                                23,  0,  0,  0,  0, 23, 23, 23, 23, 23,  0,  0, 23, 23,  0,  0,  0,  0, 23, 23, 
                                23,  0,  0,  0, 23, 23, 23, 23, 23,  0,  0,  0, 23, 23, 23,  0, 50,  0, 23, 23, 
                                23,  0,  0, 23,  3,  0,  0,  0,  0,  0,  0,  0, 23, 23, 23,  0,  0,  0, 23, 23, 
                                23,  0,  0, 23,  3,  0,  0,  0,  0,  0,  0,  0, 23, 23,  0,  0,  0, 23, 23, 23, 
                                23,  0,  0,  4, 23, 23, 23, 23, 23, 23, 23, 23, 23,  0,  0,  0,  0, 23,  5, 23, 
                                23,  0, 29,  8,  0,  0,  0,  0,  0, 11,  0,  0,  0,  0,  0,  0, 23,  5,  5, 23, 
                                23,  0,  0,  8,  0,  0,  0,  0,  0, 11,  9,  0,  0,  0,  0, 23,  5,  5,  5, 23, 
                                23,  0,  0,  8,  0,  0,  0,  0,  0, 11,  0,  0,  0, 23, 23,  5,  5,  5,  5, 23, 
                                23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 
                             ], 
                rows: 24, 
                cols: 20, 
                enemyCars: 1, 
                timeLimit: 1 * 100 * framesPerSecond,
                playerCarAngle : Math.PI/2,
                overheadSpaceships: 1
              }, 

              //level 2
              { trackLayout: [  23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
                                23, 23, 23, 23,  5,  5,  5,  5, 23, 23,  0,  0,  0,  0,  0,  0,  0,  0, 23, 23,
                                23,  3,  3, 23,  5,  5,  5, 23, 23,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 23,
                                23,  0,  0, 23,  5,  5, 23, 23,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 23,
                                23,  0,  0, 23,  5,  5, 23,  0,  0,  0,  0, 23, 23, 23, 23, 23, 23,  0,  0, 23,
                                23,  0,  0, 23, 23, 23, 23,  0,  0,  0, 23,  5,  5,  5,  5, 23, 23,  0,  0, 23,
                                23,  0,  0, 23, 23, 23,  0,  0,  0, 23,  5,  5,  5,  5,  5,  5, 23,  0,  0, 23,
                                23,  0,  0, 23, 23,  0,  0,  0, 23, 23, 23,  5,  5,  5,  5, 23,  4,  8,  8, 23,
                                23,  0,  0, 23,  0,  0,  0, 23, 23, 23, 23, 23, 23, 23, 23, 23,  0,  0,  0, 23,
                                23,  0,  0, 23,  0,  0,  0, 23, 23,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 23,
                                23,  0,  0, 23,  0,  0, 23, 23,  0,  0,  0,  0,  29,  0,  0,  0,  0,  0, 23, 23,
                                23,  0,  0, 23,  0,  0, 23, 23,  0,  0,  0,  0,  0,  0,  0,  0, 23, 23, 23, 23,
                                23,  0,  0, 23,  0,  0, 23,  0,  0,  0,  0, 23, 23, 23, 23, 23, 23, 23, 23, 23,
                                23,  0,  0, 23,  0,  0, 23,  0,  0, 23, 23, 23,  5,  5,  5,  5,  5,  5, 23, 23,
                                23,  0,  0, 23,  0,  0, 23,  0,  0, 23,  5,  5,  5,  5,  5,  5,  5,  5,  5, 23,
                                23,  0, 51, 23,  0,  0, 23, 90,  0, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
                                23,  0,  0, 23, 50,  0, 23,  0,  0, 23, 23, 23,  0,  0,  0,  0,  0, 23, 23, 23,
                                23,  0,  0, 23,  0,  0, 23,  0,  0, 23, 23,  0,  0,  0, 29,  0,  0, 23, 23, 23,
                                23,  0,  0, 23,  0,  0, 23,  0,  0, 23,  0,  0,  0,  0,  0,  0,  0,  0, 23, 23,
                                23,  0,  0, 23,  0,  0, 23,  0,  0, 23,  0,  0,  0, 23, 23, 23,  0,  0,  0, 23,
                                23,  0,  0, 23,  0,  0, 23,  0,  0, 23,  7,  0,  0, 23, 23, 23,  0,  0,  0, 23,
                                23,  0,  0, 23,  0,  0, 23,  0,  0, 23,  0,  0,  0, 23, 23, 23,  0,  0,  0, 23,
                                23,  0,  0, 23,  0,  0, 23,  0,  0, 23,  0,  0,  0, 23,  5, 23,  0,  0,  0, 23,
                                23,  0,  0, 23,  0,  0, 23,  0,  0, 23,  0,  0,  0, 23,  5, 23,  0,  0,  0, 23,
                                23,  0,  0,  4,  0,  0, 23,  0,  0, 23,  0,  0,  0, 23,  5, 23,  0,  0,  0, 23,
                                23,  0, 29,  8,  0,  0, 23,  0,  0,  4,  0,  0,  0, 23,  5, 23,  0,  0,  0, 23,
                                23,  0,  0,  8,  0,  0, 23,  0,  0,  8,  0,  0,  0, 23,  5, 23,  0,  0,  0, 23,
                                23, 23,  0,  8,  0,  0, 23,  0,  0,  8,  0,  0, 23, 23,  5, 23,  0,  0,  0, 23,
                                23, 23, 23,  8,  0, 23, 23, 23,  0,  8,  0, 23, 23, 23,  5, 23,  0,  2,  0, 23,
                                23,  5, 23, 23,  0, 23, 23, 23, 23,  8, 23, 23, 23, 23,  5, 23,  0,  0,  0, 23,
                                23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
                              ],
                rows: 31,
                cols: 20,
                enemyCars: 1,
                timeLimit: 1 * 29 * framesPerSecond,
                playerCarAngle : -Math.PI/2,
                overheadSpaceships: 1
              },


              //Level 3
              { trackLayout: [  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27, 
                                27,  27,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  27,  27, 
                                27,  27,   0,   0,   0,   0,  29,   0,   0,   0,  11,   0,   0,   0,   0,   0,   0,   0,   0,  27, 
                                27,  27,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   7,  27, 
                                27,   0,   0,   0,  27,  27,  27,  27,  27,  27,   6,  27,  27,  27,  27,  27,   0 ,  0,   0,  27, 
                                27,   0,   0,   0,  27,  27,   6,   6,   6,   6,  27,  27,   0,   0,   0,  27,   0,   0,   0,  27, 
                                27,   0,   0,   0,  27,  27,  27,  27,  27,   0,   0,   0,   0,   0,   0,  27,   0,   0,   0,  27, 
                                27,   0,   0,   0,  27,   0,   0,  27,  27,   0,   0,   0,   0,   0,   0,  27,   0,   0,   0,  27, 
                                27,   0,   0,   0,  27,   0,   0,  27,  27,   0,   0,   0,   0,   0,   0,  27,   0,   0,   0,  27, 
                                27,   0,   0,  27,  27,   0,   0,  27,   0,   0,   0,  27,   0,   0,   0,   4,   0,   0,   0,  27, 
                                27,   2,   0,  27,   0,   0,   0,   0,   0,   0,   0,  27,   0,   0,   0,   8,   0,   0,   0,  27, 
                                27,  27,  27,  27,   0,   0,   0,  29,   0,   0,   0,  27,   0,   0,   0,   8,   0,   0,   0,  27, 
                                27,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  27,   0,   0,   0,   8,   0,   0,   0,  27, 
                                27,   0,   0,   0,   0,   0,  27,   6,   6,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27, 
                                27,   0,  50,   0,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,   6, 
                                27,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   8,  27,   6,   6,   6,   6, 
                                27,   0,   0,   0,   0,   0,   0,   0,  90,  0,   11,   0,   0,   0,   8,   0,  27,   6,   6,   6, 
                                27,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   8,   0,   0,  27,   6,   6, 
                                27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,   0,   0,   8,   0,   0,   0,  27,   6, 
                                27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,   4,   0,   0,   0,  27,  27, 
                                27,   0,   0,   0,   0,   0,   0,  27,   0,   0,   0,   0,   0,   0,  27,   0,   0,   0,  27,  27, 
                                27,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  27,   0,   0,   0,  27,  27, 
                                27,   0,   0,   0,   0,   0,   0,   0,   0,  29,   0,   0,   0,   0,  27,   0,  51,   0,  27,  27, 
                                27,   0,   0,   0,  27,  11,   0,   0,   0,   9,   0,   0,   0,   0,  27,   0,   0,   0,  27,  27, 
                                27,   0,   0,   0,  27,  27,   0,   0,   0,   0,   0,   0,   0,   0,  27,   0,   0,   0,  27,  27, 
                                27,   0,   0,   0,  27,  27,  27,  27,  27,  27,  27,   0,   0,   0,   0,   0,   0,   0,  27,  27, 
                                27,   0,   51,  0,   0,   0,   0,   0,   0,   8,  27,   0,   0,   0,   0,   0,   0,   0,  27,  27, 
                                27,   0,   0,   0,   0,   0,   0,   0,   0,   8,  27,   0,   0,   0,   0,   0,   0,   0,  27,  27, 
                                27,   0,   0,   0,   0,   0,   0,   0,   0,   8,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27, 
                                27,  27,  27,  27,  27,  27,  27,   0,   0,   8,   0,   0,   0,   0,   0,   0,   0,   0,   0,  27, 
                                27,  28,  28,   6,   6,   6,   6,  27,   0,   8,   0,   0,   0,   0,   0,   0,   0,   0,   0,  27, 
                                27,  28,  28,  28,  28,  27,  27,  27,  27,   4,   0,   0,   0,   0,   0,   0,   0,   0,   0,  27, 
                                27,  28,  28,  28,  28,   3,   6,  27,  27,  27,  27,  27,  27,  27,  27,  27,   0,  50,   0,  27, 
                                27,  28,  28,  28,  28,   3,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  27, 
                                27,  28,  28,  28,  28,   3,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  27, 
                                27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27,  27, 
                                 ], 
                rows: 36, 
                cols: 20, 
                enemyCars: 1, 
                timeLimit: 1 * 50 * framesPerSecond,
                playerCarAngle : -Math.PI/2,
                overheadSpaceships: 1
              }, 

              { trackLayout: [  27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27,
                                27,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  8,  0,  0,  0, 27,
                                27,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 11,  0,  0,  0,  0,  0,  0,  8,  0,  0,  0, 27,
                                27,  0,  0,  0,  0,  0, 90,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  8,  0,  0,  0, 27,
                                27,  0,  0,  0, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27,  4,  0,  0,  0, 27,  
                                27,  0,  0,  0, 27,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 27,  0,  0,  0, 27,
                                27,  0,  0,  0, 27,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 11,  0, 27,  0,  0,  0, 27,
                                27,  0,  0,  0, 27,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 27,  0,  0,  0, 27,
                                27,  0,  0,  0, 27,  0,  0,  0, 27, 27, 27, 27, 27, 27, 27, 27, 27,  0,  0,  0, 27,  0,  0,  0, 27,
                                27,  0,  0,  0, 27,  0,  0,  0, 27,  6,  6,  6,  6,  6,  6,  6, 27,  0,  0,  0, 27,  0,  0,  0, 27,
                                27,  0,  0,  0, 27,  0,  0,  0, 27,  6,  6,  6,  6,  6,  6,  6, 27,  0,  0,  0, 27,  0,  0,  0, 27,
                                27,  0,  0,  0, 27,  0,  0,  0, 27,  6, 27, 27, 27, 27, 27, 27, 27,  0,  0,  0, 27,  0,  0,  0, 27,
                                27,  0,  0,  0, 27,  0,  0,  0, 27,  6, 27,  0,  0,  0,  0,  0,  0,  0,  0,  0, 27,  0,  0,  0, 27,
                                27,  0,  0,  0, 27,  0, 11,  0, 27,  6, 27,  2,  0,  0,  0,  0,  0,  0,  0,  0, 27,  0,  0,  0, 27,
                                27,  0, 51,  0, 27,  0,  0,  0, 27,  6, 27,  0,  0,  0,  0,  0,  0,  0,  0,  0, 27,  0,  0,  0, 27,
                                27,  0,  0,  0, 27,  0,  0,  0, 27,  6, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27,  0,  0,  0, 27,
                                27,  0,  0,  0, 27,  0,  0,  0, 27,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6, 27,  0,  0,  0, 27,
                                27,  0,  0,  0, 27,  0,  0,  0,  4, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27,  0,  0,  0, 27,
                                27,  0,  0,  0, 27,  0,  0,  0,  8,  0,  0, 29,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 27,
                                27,  0,  0,  0, 27,  0,  0,  0,  8,  0,  0, 29,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  7,  0, 27,
                                27,  0,  0,  0, 27,  0,  0,  0,  8,  0,  0, 29,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 27,
                                27,  0,  0,  0,  4, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27,
                                27,  0,  0,  0,  8,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  7,  0,  0,  0,  0,  0,  0,  0, 27,
                                27,  0,  0,  0,  8,  0,  0,  0,  0, 50,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 11, 27,
                                27,  0,  0,  0,  8,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 11, 27,
                                27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27,  0,  0, 11, 27,
                                27,  6,  6,  6,  6,  6, 27, 27,  6,  6,  6, 27, 27,  6,  6,  6,  6,  6,  6,  6, 27,  0,  0, 11, 27,
                                27, 27, 27, 27, 27, 27, 27, 27,  6,  6, 27, 27, 27, 27,  6,  6,  6,  6,  6,  6, 27,  0,  0, 11 ,27,
                                27,  3,  0,  0,  0,  0,  0,  0, 27, 27,  0,  0,  0,  0, 27,  6,  6,  6,  6, 27,  0,  0,  0, 11, 27,
                                27,  3,  0,  0,  0,  0,  0,  0, 27,  0,  0,  0,  0,  0,  0, 27,  6,  6, 27,  0,  0,  0,  0, 27, 27,
                                27,  3,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 27,  4,  0,  0,  0,  0, 27,  6, 27,
                                27, 27, 27, 27, 27, 27,  0,  0,  0,  0,  0, 27, 27,  0,  0,  0,  0,  8,  0,  0,  0, 27,  6,  6, 27,
                                27,  6,  6,  6,  6, 27, 27,  0,  0,  0, 27, 27, 27, 27,  0,  0,  0,  8,  0,  0, 27,  6,  6,  6, 27,
                                27,  6,  6,  6,  6, 27 ,27, 27, 27, 27, 27,  6,  6, 27, 27,  0,  0,  8,  0, 27,  6,  6,  6,  6, 27,
                                27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27
                              ],
                rows: 35,
                cols: 25,
                enemyCars: 2,
                timeLimit: 1 * 100 * framesPerSecond,
                playerCarAngle : 0,
                overheadSpaceships: 1
              },


              //level 3
              { trackLayout: [  20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
                                20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4, 20, 20, 20, 20, 20, 20, 20, 20,  0,  0,  0,  0, 20, 20, 20,
                                20,  0, 51,  0,  0,  0,  0,  0,  0,  0,  8, 20, 20, 20, 20, 20, 20, 20,  0,  0,  0,  0,  0,  0, 20, 20,
                                20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  8,  0, 20, 20, 20, 20, 20,  0,  0,  0,  0,  0,  0,  0, 20, 20,
                                20,  0,  0,  0, 20, 20, 20, 20, 20,  0,  8,  0,  0, 20, 20, 20,  0,  0,  0,  0, 20,  0,  0,  0, 20, 20,
                                20,  0,  0,  0,  0, 20, 20, 20, 20, 20,  8,  0,  0,  0, 20,  0,  0,  0,  0, 20, 20,  0,  0,  0, 20, 20,
                                20, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20,  0,  0,  0,  0,  0,  0,  0, 20, 20,  0,  0,  0, 20, 20, 20,
                                20, 20, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20,  0,  0,  0,  0,  0, 20, 20,  0,  0,  0,  0, 20, 20, 20,
                                20, 20, 20, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20, 11, 11, 11, 20, 20,  0,  0,  0,  0, 20, 20, 20, 20,
                                20, 20, 20, 20, 20,  0, 29,  0,  0, 20, 20, 20, 20, 20, 20, 20, 20,  0, 29,  0,  0, 20, 20, 20, 20, 20,
                                20, 20, 20, 20, 20, 20,  0,  0,  0,  8, 20, 20, 20, 20, 20, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20,
                                20, 20, 20,  0, 20, 20, 20,  0,  0,  8,  0, 20, 20, 20, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20, 20,
                                20, 20,  0,  0,  0, 20, 20, 20,  0,  8,  0,  0, 20, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20, 20, 20,
                                20,  0,  0,  0,  0,  0, 20, 20, 20,  8,  0,  0, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20, 20, 20, 20,
                                20,  0, 51,  0,  0,  0,  0, 20, 20,  4,  0,  0, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20, 20, 20, 20,
                                20,  0,  0,  0,  0,  0,  0,  0, 20, 20,  0,  0, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20, 20, 20, 20,
                                20,  0,  0,  0, 20,  0,  0,  0,  0, 20,  0,  0, 20, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20, 20, 20,
                                20,  0,  0,  0,  4, 20,  0,  0,  0,  0,  0,  0, 20, 20, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20, 20,
                                20,  0,  0,  0,  8, 20, 20,  0,  0,  0,  50, 0, 20, 20, 20, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20,
                                20, 20,  0,  0,  8,  0, 20, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20,  0, 50,  0,  0, 20, 20, 20, 20, 20,
                                20, 20, 20,  0,  8,  0,  0, 20, 20,  0,  0,  0, 20, 90, 20, 20, 20, 20,  0,  0,  0,  0, 20, 20, 20, 20,
                                20, 20, 20, 20,  8, 29,  0,  0, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,  0,  0,  0,  0, 20, 20, 20,
                                20,  3,  3, 20, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20,  0,  0,  7,  0, 20, 20,  0,  0,  0,  0, 20, 20,
                                20,  0,  0, 20, 20, 20,  0,  0,  0,  0, 20, 20, 20,  0,  0,  0,  0,  0,  0, 20, 20,  0,  0,  0, 20, 20,
                                20,  0,  0, 20, 20, 20, 20,  0,  0,  0,  0, 20, 20,  0,  0,  0,  0,  0,  0,  0, 20, 20,  0,  0,  0, 20,
                                20,  0,  0, 20, 20, 20, 20, 20,  0,  0,  0,  0, 20,  0,  0,  0, 20,  0,  0,  0,  0,  4,  0,  0,  0, 20,
                                20,  0,  0, 20, 20, 20, 20, 20, 20,  0,  0,  0, 20,  0, 29,  0, 20, 20,  0,  0,  0,  8,  0,  0,  0, 20,
                                20,  0,  0, 20, 20, 20, 20, 20, 20,  0,  0,  0, 20,  0,  0,  0, 20, 20, 20,  0,  0,  8,  0,  0,  0, 20,
                                20,  0,  0, 20, 20, 20, 20, 20, 20,  0,  0,  0, 20,  0,  0,  0, 20, 20, 20, 20,  0,  8,  0,  0,  0, 20,
                                20,  0,  0, 20, 20, 20, 20, 20,  0,  0,  0,  7, 20,  0,  0,  0,  0, 20, 20, 20, 20,  8,  0,  0, 20, 20,
                                20,  0,  0, 20, 20, 20, 20,  0,  0,  0,  0, 20, 20, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20, 20, 20,
                                20,  0,  0, 20, 20, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20, 20,
                                20,  0,  0, 20, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20, 20,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20,
                                20,  0,  0,  0,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20, 20, 20, 20,  0,  0,  0, 0, 20, 20, 20, 20, 20,
                                20,  0,  0,  0,  0, 29,  0, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,  0,  0,  0,  0,  0,  0,  0, 20,
                                20,  0,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,  0,  0,  0,  0,  0,  2, 20,
                                20, 20,  0,  0,  0, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,  0,  0,  0,  0,  0, 20,
                                20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
                              ],
                rows: 38,
                cols: 26,
                enemyCars: 2,
                timeLimit: 1 * 50 * framesPerSecond,
                playerCarAngle : -Math.PI,
                overheadSpaceships: 1
              },

            ];
