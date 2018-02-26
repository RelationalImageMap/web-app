import { GeoPoint } from '@firebase/firestore-types';

export interface MapData {
  geo: GeoPoint;
  imageUrl: string;
  id?: string;
}
