import {
  type AppOwner,
  booleanToSqliteBoolean,
  createEvolu,
  createFormatTypeError,
  createIdFromString,
  id,
  Mnemonic,
  type Query,
  SimpleName,
  sqliteFalse,
  sqliteTrue,
} from '@evolu/common'
import { createUseEvolu, EvoluProvider, useQuery } from '@evolu/react'
import { evoluReactWebDeps } from '@evolu/react-web'
import geodata, { type CountryData } from '../data/geodata'

const CountryId = id('Country')
type CountryId = typeof CountryId.Type

const Schema = {
  visits: { id: CountryId },
  wishes: { id: CountryId },
}

export type Table = keyof typeof Schema

export const countryIdToBrandedId = (id: string): CountryId =>
  createIdFromString(id)

const [countryDataById, countryDataByBrandedId] = geodata.features.reduce<
  [Record<string, CountryData>, Record<CountryId, CountryData>]
>(
  (acc, { id, properties }) => (
    (acc[0][id as string] = properties),
    (acc[1][countryIdToBrandedId(id as string)] = properties),
    acc
  ),
  [{}, {}],
)
export { countryDataByBrandedId, countryDataById }

export const getCountryDataByCountryId = (id: string) => countryDataById[id]
export const getCountryDataByBrandedId = (id: CountryId) =>
  countryDataByBrandedId[id]
export const brandedIdToCountryId = (id: CountryId) =>
  getCountryDataByBrandedId(id).id

export const evolu = createEvolu(evoluReactWebDeps)(Schema, {
  name: SimpleName.orThrow('countryquest'),
  // TODO remove
  transports: [],
})

export const visitsQuery = evolu.createQuery(db =>
  db.selectFrom('visits').select('id').where('isDeleted', 'is not', sqliteTrue),
)
export type VisitsRow = typeof visitsQuery.Row

export const wishesQuery = evolu.createQuery(db =>
  db.selectFrom('wishes').select('id').where('isDeleted', 'is not', sqliteTrue),
)
export type WishesRow = typeof wishesQuery.Row

export type CountriesRow = VisitsRow | WishesRow

export const formatTypeError = createFormatTypeError()
export const useEvolu = createUseEvolu(evolu)
export {
  AppOwner,
  booleanToSqliteBoolean,
  EvoluProvider,
  Mnemonic,
  Query,
  sqliteFalse,
  sqliteTrue,
  useQuery,
}
