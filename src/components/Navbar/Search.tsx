import React, { useState } from 'react'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import useStyleNavbar from '../../customHooks/useStyles/useStyleNavbar'
import { useRouter } from 'next/dist/client/router'
import { addResultSearch } from '../../redux/photoSlice'
import { addVideoSearch } from '../../redux/videoSlice'
import { useAppDispatch } from '../../store/store'

export default function Search({ typeSearch }: { typeSearch: string }) {
  const dispatch = useAppDispatch()
  const classes = useStyleNavbar()
  const [query, setQuery] = useState<string>('')
  const router = useRouter()
  const handleSearch = (e: any) => {
    e.preventDefault()
    const userText = query.replace(/^\s+/, '').replace(/\s+$/, '')
    if (userText === '') {
      return
    }
    if (typeSearch === 'Wallpaper') {
      dispatch(
        addResultSearch({
          removeCopyArray: true,
        })
      )
      router.push(`/search-wallpaper/${query}`)
    }
    if (typeSearch === 'Videos') {
      dispatch(
        addVideoSearch({
          removeCopyArray: true,
        })
      )
      router.push(`/search-video/${query}`)
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
