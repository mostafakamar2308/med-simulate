export type Self = {
  id: string;
  name: string;
  whatsappNumber: string;
  university: University;
  createdAt: string;
  updatedAt: string;
};

export type Row = {
  id: string;
  name: string;
  whatsapp_number: string;
  university: University;
  created_at: Date;
  updated_at: Date;
};

export enum University {
  QasrElEiny = 0,
  Helwan = 1,
  Alexandria = 2,
  AinShams = 3,
  Assiut = 4,
  Mansoura = 5,
  AlAzhar = 6,
  Cairo = 7,
  Damietta = 8,
  Fayoum = 9,
  Minia = 10,
  Benha = 11,
  BeniSuef = 12,
  KafrElSheikh = 13,
  Menoufia = 14,
  SouthValley = 15,
  SuezCanal = 16,
  Tanta = 17,
  Zagazig = 18,
  ZagazigFaqous = 19,
  Sohag = 20,
  PortSaid = 21,
  Aswan = 22,
  Suez = 23,
  ArmedForces = 24,
  NewValley = 25,
  Luxor = 26,
  Arish = 27,
  SadatCity = 28,

  // Private
  NewGiza = 29,
  October6 = 30,
  MUST = 31,
  NGU = 32,
  NUB = 33,
  BUC = 34,
  MTI = 35,
  Delta = 36,
  Merit = 37,
  Horus = 38,
  Badya = 39,
  MIU = 40,
  Future = 41,
  AhramCanadian = 42,
  Sinai = 43,
  NewMansoura = 44,
  AAST = 45,
  AlAlamein = 46,

  // National
  Galala = 47,
  KingSalman = 48,
  AlexandriaNational = 49,
  AssiutNational = 50,
  BenhaNational = 51,
  EastPortSaidNational = 52,
  MansouraNational = 53,
  MiniaNational = 54,
  NewIsmailiaNational = 55,
  SouthValleyNational = 56,
  ZagazigNational = 57,
  BeniSuefNational = 58,
  MenoufiaNational = 59,
  CairoNational = 60,
  AinShamsNational = 61,
  SohagNational = 62,
  KafrElSheikhNational = 63,
  TantaNational = 64,
  FayoumNational = 65,
  HelwanNational = 66,
}
