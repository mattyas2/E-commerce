import { useContext } from 'react'
import { FiltersContext } from '../context/FilterContext'

export function useFilters () {
  const { filters, setFilters } = useContext(FiltersContext)

  const filterProducts = (productos) => {
    return productos.filter(product => {
      return (
        product.price >= filters.minPrice &&
        (
          filters.category === 'all' ||
          product.category === filters.category
        )
      )
    })
  }

  return { filters, filterProducts, setFilters }
}