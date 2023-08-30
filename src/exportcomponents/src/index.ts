import * as mocks from './mocks/mockHandlers';

export {
    default as Header
} from './header';

export {
    default as MainNavigation
} from './menu';

export {
    api
} from './header/services/mock-apis';

export {
   default as apiDev
} from './header/services/api-dev'

export {
    default as apiDevV2
} from './header/services/api-dev-v2'

export {
    default as auth
} from './header/services/auth'

export default mocks;
