const csvData = `s_no,id,name,rating,solvedCount,link
1,4A,Watermelon,800,677657,https://codeforces.com/problemset/problem/4/A
2,71A,Way Too Long Words,800,496405,https://codeforces.com/problemset/problem/71/A
3,231A,Team,800,424137,https://codeforces.com/problemset/problem/231/A
4,282A,Bit++,800,352898,https://codeforces.com/problemset/problem/282/A
5,158A,Next Round,800,316154,https://codeforces.com/problemset/problem/158/A
6,50A,Domino piling,800,313850,https://codeforces.com/problemset/problem/50/A
7,263A,Beautiful Matrix,800,312910,https://codeforces.com/problemset/problem/263/A
8,112A,Petya and Strings,800,283865,https://codeforces.com/problemset/problem/112/A
9,236A,Boy or Girl,800,274745,https://codeforces.com/problemset/problem/236/A
10,339A,Helpful Maths,800,270388,https://codeforces.com/problemset/problem/339/A
11,96A,Football,900,191838,https://codeforces.com/problemset/problem/96/A
12,318A,Even Odds,900,141221,https://codeforces.com/problemset/problem/318/A
13,160A,Twins,900,140876,https://codeforces.com/problemset/problem/160/A
14,405A,Gravity Flip,900,124899,https://codeforces.com/problemset/problem/405/A
15,133A,HQ9+,900,123833,https://codeforces.com/problemset/problem/133/A
16,208A,Dubstep,900,104122,https://codeforces.com/problemset/problem/208/A
17,580A,Kefa and First Steps,900,103511,https://codeforces.com/problemset/problem/580/A
18,337A,Puzzles,900,94004,https://codeforces.com/problemset/problem/337/A
19,1475A,Odd Divisor,900,85157,https://codeforces.com/problemset/problem/1475/A
20,451A,Game With Sticks,900,75162,https://codeforces.com/problemset/problem/451/A
21,1374B,"Multiply by 2, divide by 6",900,70332,https://codeforces.com/problemset/problem/1374/B
22,34B,Sale,900,65067,https://codeforces.com/problemset/problem/34/B
23,313A,Ilya and Bank Account,900,64520,https://codeforces.com/problemset/problem/313/A
24,1850D,Balanced Round,900,59414,https://codeforces.com/problemset/problem/1850/D
25,1883B,Chemistry,900,57987,https://codeforces.com/problemset/problem/1883/B
26,1A,Theatre Square,1000,316789,https://codeforces.com/problemset/problem/1/A
27,118A,String Task,1000,229449,https://codeforces.com/problemset/problem/118/A
28,69A,Young Physicist,1000,200235,https://codeforces.com/problemset/problem/69/A
29,58A,Chat room,1000,154428,https://codeforces.com/problemset/problem/58/A
30,122A,Lucky Division,1000,148242,https://codeforces.com/problemset/problem/122/A
31,479A,Expression,1000,111230,https://codeforces.com/problemset/problem/479/A
32,131A,cAPS lOCK,1000,100072,https://codeforces.com/problemset/problem/131/A
33,230A,Dragons,1000,96232,https://codeforces.com/problemset/problem/230/A
34,339B,Xenia and Ringroad,1000,80720,https://codeforces.com/problemset/problem/339/B
35,579A,Raising Bacteria,1000,77590,https://codeforces.com/problemset/problem/579/A
36,43A,Football,1000,68435,https://codeforces.com/problemset/problem/43/A
37,1374C,Move Brackets,1000,62932,https://codeforces.com/problemset/problem/1374/C
38,500A,New Year Transportation,1000,61979,https://codeforces.com/problemset/problem/500/A
39,379A,New Year Candles,1000,52869,https://codeforces.com/problemset/problem/379/A
40,584A,Olesya and Rodion,1000,52166,https://codeforces.com/problemset/problem/584/A
41,158B,Taxi,1100,102027,https://codeforces.com/problemset/problem/158/B
42,706B,Interesting drink,1100,82056,https://codeforces.com/problemset/problem/706/B
43,363B,Fence,1100,66043,https://codeforces.com/problemset/problem/363/B
44,456A,Laptops,1100,55961,https://codeforces.com/problemset/problem/456/A
45,313B,Ilya and Queries,1100,53781,https://codeforces.com/problemset/problem/313/B
46,270A,Fancy Fence,1100,50514,https://codeforces.com/problemset/problem/270/A
47,368B,Sereja and Suffixes,1100,49354,https://codeforces.com/problemset/problem/368/B
48,1327A,Sum of Odd Integers,1100,45356,https://codeforces.com/problemset/problem/1327/A
49,519B,A and B and Compilation Errors,1100,43477,https://codeforces.com/problemset/problem/519/B
50,467B,Fedor and New Game,1100,42545,https://codeforces.com/problemset/problem/467/B
51,1873E,Building an Aquarium,1100,42216,https://codeforces.com/problemset/problem/1873/E
52,1791E,Negatives and Positives,1100,40508,https://codeforces.com/problemset/problem/1791/E
53,1335C,Two Teams Composing,1100,38757,https://codeforces.com/problemset/problem/1335/C
54,1669F,Eating Candies,1100,38673,https://codeforces.com/problemset/problem/1669/F
55,1914C,Quests,1100,38624,https://codeforces.com/problemset/problem/1914/C
56,492B,Vanya and Lanterns,1200,88890,https://codeforces.com/problemset/problem/492/B
57,466A,Cheap Travel,1200,76322,https://codeforces.com/problemset/problem/466/A
58,514A,Chewbaсca and Number,1200,70401,https://codeforces.com/problemset/problem/514/A
59,1352C,K-th Not Divisible by n,1200,68770,https://codeforces.com/problemset/problem/1352/C
60,1520D,Same Differences,1200,63280,https://codeforces.com/problemset/problem/1520/D
61,474B,Worms,1200,61495,https://codeforces.com/problemset/problem/474/B
62,489B,BerSU Ball,1200,56131,https://codeforces.com/problemset/problem/489/B
63,433B,Kuriyama Mirai's Stones,1200,52696,https://codeforces.com/problemset/problem/433/B
64,327A,Flipping Game,1200,49359,https://codeforces.com/problemset/problem/327/A
65,1352B,Same Parity Summands,1200,44445,https://codeforces.com/problemset/problem/1352/B
66,1343C,Alternating Subsequence,1200,43703,https://codeforces.com/problemset/problem/1343/C
67,977C,Less or Equal,1200,42746,https://codeforces.com/problemset/problem/977/C
68,1857C,Assembly via Minimums,1200,40661,https://codeforces.com/problemset/problem/1857/C
69,1363A,Odd Selection,1200,40120,https://codeforces.com/problemset/problem/1363/A
70,1872D,Plus Minus Permutation,1200,37906,https://codeforces.com/problemset/problem/1872/D
71,4C,Registration System,1300,105795,https://codeforces.com/problemset/problem/4/C
72,25A,IQ test,1300,102673,https://codeforces.com/problemset/problem/25/A
73,230B,T-primes,1300,94392,https://codeforces.com/problemset/problem/230/B
74,189A,Cut Ribbon,1300,79876,https://codeforces.com/problemset/problem/189/A
75,451B,Sort the Array,1300,52265,https://codeforces.com/problemset/problem/451/B
76,459B,Pashmak and Flowers,1300,47060,https://codeforces.com/problemset/problem/459/B
77,1294C,Product of Three Numbers,1300,45465,https://codeforces.com/problemset/problem/1294/C
78,1360D,Buying Shovels,1300,42322,https://codeforces.com/problemset/problem/1360/D
79,478B,Random Teams,1300,40961,https://codeforces.com/problemset/problem/478/B
80,600B,Queries about less or equal elements,1300,38330,https://codeforces.com/problemset/problem/600/B
81,476B,Dreamoon and WiFi,1300,36607,https://codeforces.com/problemset/problem/476/B
82,1372B,Omkar and Last Class of Math,1300,35849,https://codeforces.com/problemset/problem/1372/B
83,1538C,Number of Pairs,1300,34036,https://codeforces.com/problemset/problem/1538/C
84,1915E,Romantic Glasses,1300,33808,https://codeforces.com/problemset/problem/1915/E
85,1927D,Find the Different Ones!,1300,32480,https://codeforces.com/problemset/problem/1927/D
86,279B,Books,1400,70767,https://codeforces.com/problemset/problem/279/B
87,520B,Two Buttons,1400,61356,https://codeforces.com/problemset/problem/520/B
88,489C,Given Length and Sum of Digits...,1400,51379,https://codeforces.com/problemset/problem/489/C
89,698A,Vacations,1400,37368,https://codeforces.com/problemset/problem/698/A
90,1526B,I Hate 1111,1400,36335,https://codeforces.com/problemset/problem/1526/B
91,1195C,Basketball Exercise,1400,34254,https://codeforces.com/problemset/problem/1195/C
92,1324D,Pair of Topics,1400,33725,https://codeforces.com/problemset/problem/1324/D
93,479C,Exams,1400,32873,https://codeforces.com/problemset/problem/479/C
94,1201C,Maximum Median,1400,32361,https://codeforces.com/problemset/problem/1201/C
95,1374D,Zero Remainder Array,1400,30575,https://codeforces.com/problemset/problem/1374/D
96,455A,Boredom,1500,70956,https://codeforces.com/problemset/problem/455/A
97,580C,Kefa and Park,1500,54616,https://codeforces.com/problemset/problem/580/C
98,550A,Two Substrings,1500,43373,https://codeforces.com/problemset/problem/550/A
99,276C,Little Girl and Maximum Sum,1500,38732,https://codeforces.com/problemset/problem/276/C
100,545C,Woodcutters,1500,32543,https://codeforces.com/problemset/problem/545/C
`;
