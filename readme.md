# Autoscout24 code challenge

## Instructions

- Clone repo locally
- I used yarn, but all command should work with npm.

### Using the solution

- After you have followed the rest of the instructions, the app should be served on port `3000`.  You can change this in code if you so choose.

- You can navigate to `http://localhost:3000` and you should get a `404`.

- To view data for the reports you will need to navigate to  `http://localhost:3000/reports?type={X}` where X is the report you would like.

- There are 4 possible reports. `X = 0 | 1 | 2 | 3`
- `0 = Average Selling Price per Seller Type`
- `1 = Distribution Of Cars By Make in %`
- `2 = Average Price of the 30% Most Contacted Listings`
- `3 = Top Five Most Contactacted Listings By Month`

#### Install depenencies

- `yarn install`.

#### Run the solution

- `yarn run serve`.  This will build the code and serve it.

#### Test

- Theere are limmited test at the moment.
- Run `yarn run test` to run them all.

## Tested on the following setup

- macOS 11.1
- node v14.15.4
- yarn 1.22.10
