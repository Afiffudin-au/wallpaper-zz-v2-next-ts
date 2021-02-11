import React, { useState } from 'react'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import useStyleNavbar from '../../customHooks/useStyles/useStyleNavbar'

export default function Search({ typeSearch }: { typeSearch: string }) {
  const classes = useStyleNavbar()
  const [query, setQuery] = useState('')
  const handleSearch = (e: any) => {
    e.preventDefault()
    const userText = query.replace(/^\s+/, '').replace(/\s+$/, '')
    if (userText === '') {
      return
    }
  }
  return (
    <form action=''>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        onChange={(e) => setQuery(e.target.value)}
        placeholder={'Search...' + typeSearch}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
      <button onClick={handleSearch} style={{ display: 'none' }}></button>
    </form>
  )
}
