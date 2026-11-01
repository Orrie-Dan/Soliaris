import countries from "./africa-countries.json";

/** Natural Earth (generalized) outer rings, [lon, lat], trimmed to the map's area. */
export type GeoCountry = { name: string; rings: [number, number][][] };
export const GEO_COUNTRIES = countries as GeoCountry[];

export type Location = {
  /** Display name. */
  name: string;
  /** Matching `name` in GEO_COUNTRIES. */
  geo: string;
  /** Where the country name is set on the map (hand-placed clear of the capital and neighbours). */
  lon: number;
  lat: number;
  /** "end": set offshore, right-aligned to the anchor (countries too small to hold their name). */
  anchor?: "end";
  capital: { name: string; lon: number; lat: number };
  /** Approximate size class, used for label type size. */
  size: "l" | "m" | "s";
  description: string;
};

/** The Gambia first (home base); the rest are the illustrative regional outlook. */
export const LOCATIONS: Location[] = [
  {
    name: "The Gambia",
    geo: "Gambia",
    lon: -17.25,
    lat: 13.55,
    anchor: "end",
    capital: { name: "Banjul", lon: -16.58, lat: 13.45 },
    size: "s",
    description:
      "Our starting point for exploring energy generation, grid infrastructure and future regional partnerships. Select a country to explore the regional outlook.",
  },
  {
    name: "Burkina Faso",
    geo: "Burkina Faso",
    lon: -1.8,
    lat: 13.95,
    capital: { name: "Ouagadougou", lon: -1.52, lat: 12.37 },
    size: "m",
    description: "Potential energy access and grid-infrastructure development opportunities.",
  },
  {
    name: "Senegal",
    geo: "Senegal",
    lon: -14.6,
    lat: 15.15,
    capital: { name: "Dakar", lon: -17.44, lat: 14.69 },
    size: "m",
    description:
      "Illustrative opportunities for cross-border coordination, energy infrastructure and future partnerships.",
  },
  {
    name: "Mauritania",
    geo: "Mauritania",
    lon: -10.6,
    lat: 20.2,
    capital: { name: "Nouakchott", lon: -15.98, lat: 18.08 },
    size: "l",
    description:
      "Potential long-term regional collaboration in power infrastructure and renewable-energy development.",
  },
  {
    name: "Mali",
    geo: "Mali",
    lon: -3.2,
    lat: 18.4,
    capital: { name: "Bamako", lon: -8, lat: 12.64 },
    size: "l",
    description:
      "Exploring the wider West African energy landscape and regional integration potential.",
  },
  {
    name: "Niger",
    geo: "Niger",
    lon: 8.8,
    lat: 17.6,
    capital: { name: "Niamey", lon: 2.11, lat: 13.51 },
    size: "l",
    description: "Illustrative regional outlook for long-term energy infrastructure opportunities.",
  },
  {
    name: "Guinea-Bissau",
    geo: "Guinea-Bissau",
    lon: -16.95,
    lat: 11.55,
    anchor: "end",
    capital: { name: "Bissau", lon: -15.6, lat: 11.86 },
    size: "s",
    description:
      "A neighboring market for exploring energy access, development and infrastructure cooperation.",
  },
  {
    name: "Guinea",
    geo: "Guinea",
    lon: -10.9,
    lat: 10.95,
    capital: { name: "Conakry", lon: -13.68, lat: 9.64 },
    size: "m",
    description: "Potential partnerships and future regional energy infrastructure development.",
  },
  {
    name: "Sierra Leone",
    geo: "Sierra Leone",
    lon: -13.55,
    lat: 7.95,
    anchor: "end",
    capital: { name: "Freetown", lon: -13.23, lat: 8.48 },
    size: "s",
    description: "Illustrative opportunities for regional power development and collaboration.",
  },
  {
    name: "Liberia",
    geo: "Liberia",
    lon: -9.15,
    lat: 6.85,
    capital: { name: "Monrovia", lon: -10.8, lat: 6.3 },
    size: "s",
    description: "Exploring future grid and energy development opportunities across the region.",
  },
  {
    name: "Côte d’Ivoire",
    geo: "Côte d'Ivoire",
    lon: -5.6,
    lat: 8.25,
    capital: { name: "Yamoussoukro", lon: -5.28, lat: 6.82 },
    size: "m",
    description: "An important West African power market within the broader regional outlook.",
  },
  {
    name: "Ghana",
    geo: "Ghana",
    lon: -1.15,
    lat: 8.3,
    capital: { name: "Accra", lon: -0.19, lat: 5.6 },
    size: "m",
    description:
      "Illustrative outlook for power infrastructure, investment and future regional collaboration.",
  },
  {
    name: "Nigeria",
    geo: "Nigeria",
    lon: 8.3,
    lat: 10.7,
    capital: { name: "Abuja", lon: 7.49, lat: 9.06 },
    size: "l",
    description: "A major regional energy market included for geographic context and long-term outlook.",
  },
];
