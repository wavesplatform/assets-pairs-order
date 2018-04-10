# Utility for ordering pair of assets in (amount_asset, price_asset)

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
    'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA',
    'DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD',
  ]
*/
```