import React from 'react'
import { createClient } from 'pexels'
const client = createClient(
  '563492ad6f9170000100000170236dd5ebbc4d13936b1f6d2e44461c'
)
function VideoDetail({ video }: any) {
  console.log(video)
  return (
    <div className='VideoDetail'>
      <div className='VideoDetail__player'>
        <video
          controls
          src={video.video_files && video?.video_files[0].link}
          poster={video?.image}
          width='620'></video>
      </div>
    </div>
  )
}
export async function getServerSideProps({ params }: any) {
  const video = await client.videos.show({ id: params.id }).then((videos) => {
    return videos
  })
  return {
    props: {
      video,
    }, // will be passed to the page component as props
  }
}
export default VideoDetail
