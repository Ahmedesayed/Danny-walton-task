import { ICity } from './icity';

export class City implements ICity {
  id: number = 0;
  name: string = '';
  image?: string = '';

  constructor(city?: ICity) {
    if (city) {
      this.id = city.id;
      this.name = city.name;
      this.image = city.image;
    }
  }
}
