//Repository = acceso a base de datos
export interface Repository<T> {
    findAll(): T[] | undefined
    findOne(item: {id: string}): T | undefined  // Required un objeto con id
    add(item: T): T | undefined
    update(item: T): T | undefined
    delete(item: {id:string}): T | undefined
}