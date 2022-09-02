import djs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isBetween from 'dayjs/plugin/isBetween';
import isYesterday from 'dayjs/plugin/isYesterday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import en from 'dayjs/locale/en';
import fr from 'dayjs/locale/fr';

djs.locale('fr');
djs.extend(isToday);
djs.extend(isYesterday);
djs.extend(isSameOrAfter);
djs.extend(isSameOrBefore);
djs.extend(isBetween);
export default djs;
