import React, { useState } from 'react'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import useStyleBanner from '../../customHooks/useStyles/useStyleBanner'
import { useAppDispatch } from '../../store/store'
import { addResultSearch } from '../../redux/photoSlice'
import { useRouter } from 'next/dist/client/router'
function SearchBanner() {
  const dispatch = useAppDispatch()
  const [query, setQuery] = useState<string>('')
  const classes = useStyleBanner()
  const router = useRouter()
  const handleSearch = (e: any) => {
    e.preventDefault()
    const userText = query.replace(/^\s+/, '').replace(/\s+$/, '')
    if (userText === '') {
      return
    }
    dispatch(
      addResultSearch({
        removeCopyArray: true,
      })
    )
    router.push(`/search-result/${query}`)
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
