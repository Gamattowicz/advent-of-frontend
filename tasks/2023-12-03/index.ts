export type Lokalizacja = {
  x: number;
  y: number;
  z: number;
  czas: number;
};

export type MapaCzasoprzestrzenna = (
  x: number,
  y: number,
  z: number,
  czas: number
) => number;

export function znajdzWorek(
  lokalizacje: Lokalizacja[],
  mapa: MapaCzasoprzestrzenna
): Lokalizacja | null {
  let najwiekszaWartosc: number = -Infinity;
  let najlepszaLokalizacja: Lokalizacja | null = null;

  lokalizacje.forEach((lokalizacja) => {
    const { x, y, z, czas } = lokalizacja;
    const wartosc = mapa(x, y, z, czas);
    if (!isNaN(wartosc) && isFinite(wartosc) && wartosc > najwiekszaWartosc) {
      najwiekszaWartosc = wartosc;
      najlepszaLokalizacja = lokalizacja;
    }
  });

  return najlepszaLokalizacja;
}
