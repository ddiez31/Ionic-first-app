import { OpenweathermapApiWeather } from './openweathermapapi-weather.model';
import { OpenweathermapApiWind } from './openweathermapapi-wind.model';

export class OpenweathermapApiGlobal {
    weather: OpenweathermapApiWeather[];
    wind: OpenweathermapApiWind[];
    base: string;
    name: string;
}