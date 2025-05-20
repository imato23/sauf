export interface WineListFilter {
  wineName: string | null;
  category: string | null;
  producer: string | null;
  onlyAvailableWines: boolean
}
