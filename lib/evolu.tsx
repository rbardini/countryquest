import { createEvolu, id, SimpleName, sqliteTrue } from '@evolu/common'
import { createUseEvolu, EvoluProvider } from '@evolu/react'
import { evoluReactWebDeps } from '@evolu/react-web'

const CountryId = id('Country')
type CountryId = typeof CountryId.Type

const Schema = {
  visits: { id: CountryId },
  wishes: { id: CountryId },
}

export const evolu = createEvolu(evoluReactWebDeps)(Schema, {
  name: SimpleName.orThrow('countryquest'),
})

export const visitsQuery = evolu.createQuery(db =>
  db.selectFrom('visits').selectAll().where('isDeleted', 'is not', sqliteTrue),
)
export const wishesQuery = evolu.createQuery(db =>
  db.selectFrom('wishes').selectAll().where('isDeleted', 'is not', sqliteTrue),
)

export const useEvolu = createUseEvolu(evolu)
export { EvoluProvider }
