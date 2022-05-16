import './index.css';
import slider from './js/slider';
import initializeClock from './js/timer';

slider();

const deadline="May 25 2023 00:00:00 GMT+0300"; // Для указания конкретной даты
// const deadline = new Date(Date.parse(new Date()) + 11 * 24 * 60 * 60 * 1000);
initializeClock('benefit__timer', deadline);