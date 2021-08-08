import { Injectable } from '@angular/core';

import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      149.99
    ),
    new Place(
      'p2',
      "L'Amour Toujours",
      'A romantic place in Paris!',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
      189.99
    ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
      99.99
    )
  ];

  get places() {
    return [...this._places];
  }

  constructor() {}


  /*
  In this function we will pass in the ID of the Plcae and then return this places, accessing our private places array,
  will clone that entire object by using the spread operator and then we pull out all the properties of the place object we retrieved here and add them into a
  new object so that if we now were to add it, this object, we wouldn't edit the original object.
  */
  getPlace(id: string) {
    return {...this._places.find(p => p.id === id)};
  }
}
