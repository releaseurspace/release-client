export type GeoJson = {
  type: string;
  features: [
    {
      type: string;
      properties: {
        code: string;
        name: string;
        name_eng: string;
        base_year: string;
      };
      geometry: {
        type: string;
        coordinates: [[[number]]];
      };
    },
  ];
};
