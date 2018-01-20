var  levels = [

               //Demo Level
              { trackLayout: [  5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5,
                                5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                                5, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                                1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                                1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                             ],
                rows: 12,
                cols: 20,
                enemyCars: 1,
                timeLimit: 1 * 100 * framesPerSecond

              },

              // const TRACK_2_BUILDINGS_1 = 20; //border brick 1
              // const TRACK_2_BUILDINGS_2 = 21; //2 building (smaller)l->r
              // const TRACK_2_BUILDINGS_3 = 22; //2 buildings (smaller) r-> l
              // const TRACK_2_BUILDINGS_4 = 23; //border brick engraved

              // const TRACK_3_BUILDINGS_1 = 24; // border brick 2
              // const TRACK_3_BUILDINGS_2 = 25; // 3 building descending 
              // const TRACK_3_BUILDINGS_3 = 26; // 3 building ascending
              // const TRACK_3_BUILDINGS_4 = 27; //complete top down //hut bright top
              // const TRACK_4_BUILDINGS_1 = 28; //skyscraper inclined right
              //Level One
              { trackLayout: [  20, 24, 22, 21, 26, 25, 25, 27, 22, 21, 25, 26, 25, 21, 22, 25, 26, 20, 23, 23,
                                24, 23, 28,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 28, 23,
                                20, 28,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 23,
                                28,  0,  0,  0, 20, 24, 20, 24, 24, 20, 24, 24, 23, 24, 23, 24,  0,  0,  7, 20,
                                24,  0,  0, 20, 20,  6,  6,  6,  6,  6,  6, 23, 23, 23, 23, 23, 20,  0,  0, 24,
                                20,  0,  0, 24, 24, 24, 24, 24, 24, 24, 20, 20,  0,  0,  0,  0, 24,  0,  0, 20,
                                23,  0,  0, 23, 23, 23, 27, 23, 23, 23, 24,  0,  0,  0,  0,  0, 23,  0,  0, 24,
                                24,  0,  0, 20,  0,  0,  0,  0,  0, 23, 20,  0,  0,  0,  0,  0, 20,  0,  0, 23,
                                20,  0,  0, 20,  0,  0,  0,  0,  0,  0, 20,  0,  0, 20,  0,  0, 24,  0,  0, 24,
                                24,  0,  0, 20,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,  0,  0, 23,  0,  0, 20,
                                20, 2,  0,  20,  0,  0, 27, 27,  0,  0,  0,  0,  0, 20,  0,  0,  0,  0,  0, 23,
                                20, 23, 23, 20,  0,  0, 24, 27,  0,  0,  0,  0,  0, 20,  0,  0,  0,  0,  0, 20,
                                23,  0,  0,  0,  0,  0, 23,  6, 24,  0,  0,  0, 27, 20,  0,  0,  0,  0,  0, 24,
                                20,  7,  0,  0,  0,  0, 20,  6,  6, 27, 27, 27, 20, 24, 23, 27, 27, 20, 24, 20,
                                24,  0,  0, 20, 23, 23, 24, 24, 25, 26, 25, 26, 25, 26, 20, 20, 20, 20, 20,  5,
                                20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,  6,  6,  5,  5,
                                23,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 21,  6,  6,  5,
                                20,  0,  0,  0, 20, 20, 20, 23, 20, 24, 20, 20,  0, 28,  0,  0,  0, 20,  6,  6,
                                24, 20, 24, 20, 20, 23, 20, 20, 24, 20, 24, 20,  0,  0,  0,  0,  0,  0, 21,  6,
                                20, 20, 20, 20, 27, 20, 20, 20, 27, 20, 20, 27, 20, 20, 20,  0,  0,  0, 20, 23,
                                23,  0,  0,  0,  0,  0,  0,  0, 20,  0,  0,  0,  0,  0, 23, 24,  0,  0, 23, 20,
                                20,  0,  0,  0,  0,  0,  0,  0, 24,  0,  0,  0,  0,  0, 20, 20,  0,  0, 27, 24,
                                24,  0,  0,  0, 27,  0,  0,  0, 23,  0,  0,  0,  0,  0, 24, 23,  0,  0, 24, 20,
                                20,  0,  0, 20,  6, 20,  0,  0,  0,  0,  0, 24,  0,  0, 20, 20,  0,  0, 20, 23,
                                23,  0,  0, 20,  6, 20,  0,  0,  0,  0,  0, 20,  0,  0, 23, 20,  0,  0, 23, 20,
                                20,  0,  0, 20,  6,  6, 23,  0,  0,  0,  0, 23,  0,  0,  0,  0,  0, 20, 20, 24,
                                24,  0,  0, 20, 20, 24, 24, 20, 24, 20, 23, 20,  0,  0,  0,  0,  0, 20, 23, 20,
                                20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 24,  0,  0,  0,  0,  0, 20, 20, 23,
                                23,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,  0,  0,  0,  0, 20, 24, 24, 20,
                                24, 20, 24, 20, 20, 23, 20, 23, 28,  0,  0, 20, 23, 20, 24, 20, 23, 23, 20, 24,
                                23, 28, 28,  6,  6,  6,  6, 20, 20,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 20,
                                24, 28, 28, 28, 28,  6,  6, 20, 24, 20,  0,  0,  0,  0,  0,  0,  0,  0,  0, 23,
                                20, 28, 28, 28, 28,  3,  6, 20, 23, 20, 20, 20, 20, 20, 20, 20, 28,  0,  0, 20,
                                20, 28, 28, 28, 28,  3,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 24,
                                23, 28, 28, 28, 28,  3,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 20,
                                24, 20, 20, 23, 24, 23, 20, 20, 24, 20, 23, 20, 24, 20, 23, 20, 24, 20, 20, 23,
                                 ],
                rows: 36,
                cols: 20,
                enemyCars: 2,
                timeLimit: 1 * 50 * framesPerSecond
              },

            ]




        