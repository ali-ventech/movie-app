export interface Movie {
  id: string;
  title: string;
  year: number;
  description: string;
  rating: number;
  cast: { name: string }[];
  runtime: string;
  medium_cover_image: string;
  large_cover_image: string;
  small_cover_image: string;
  background_image: string;
}
