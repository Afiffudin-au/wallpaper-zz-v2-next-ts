import React, { useState } from 'react'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import useStyleBanner from '../../customHooks/useStyles/useStyleBanner'
function SearchBanner() {
  const [query, setQuery] = useState<string>('')
  const classes = useStyleBanner()
  const handleSearch = (e: any) => {
    e.preventDefault()
    const userText = query.replace(/^\s+/, '').replace(/\s+$/, '')
    if (userText === '') {
      return
    }
  }
  return (
    <form action=''>
      <div className={classes.searchBanner}>
        <div className={classes.searchIconBanner}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search… Wallpaper'
          classes={{
            root: classes.inputRootBanner,
            input: classes.inputInputBanner,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      <button onClick={handleSearch} style={{ display: 'none' }}></button>
    </form>
  )
}

export default SearchBanner
