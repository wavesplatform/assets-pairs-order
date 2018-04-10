# Utility for ordering pair of assets in (amount_asset, price_asset)


## Accepts:
```javascript
orderPairs(string, string)
orderPairs([string, string])
orderPairs([string, string], [string, string], ...)
orderPairs([[string, string], [string, string], ...])
```

## Returns:
```javascript
[
  [amount_asset1, price_asset1],
  [amount_asset2, price_asset2],
  ...
]
```
## Example:
``` 
yarn add @waves/assets-pairs-order
```
```javascript
import orderPairs from '@waves/assets-pairs-order'

orderPairs(
  'DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD',
  'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA'
)

/* [
    [
      'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA',
      'DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD',
    ]
  ]
*/


// Or you can pass in array of pairs

orderPairs([
  ['DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD', 'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA'],
  ['FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA','DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD']
])
/* [
    [
      'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA',
      'DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD',
    ],
    [
      'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA',
      'DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD',
    ]
  ]
*/
```
You can redefine `predefinedList` property:
(By default it's MAINNET_DATA)
```javascript
import orderPairs from '@waves/assets-pairs-order';
orderPairs.predefinedList = ['2', '1'];

orderPairs([['1','2']])
/* [
    [
      '2',
      '1',
    ]
  ]
*/
```