export interface Paginated<Entity> {
  total: number;
  data: Entity[];
}
