import {actionTypes} from './pieActions'
import {generateRandomValues} from '../../../src/utils/randomDataGenerator'

 const pieData = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_DATA:
            return [1,2,3,4]
            //return generateRandomValues()
        default:
            return state
    }
}
export default pieData