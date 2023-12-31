import React from 'react'
import './style.scss'
import useFetch from './../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'
import VideosSection from './videosSection/VideosSection'
import Cast from './cast/Cast'
import Similar from './carousel/Similar'
import Recommendation from './carousel/Recommendatation'

const Detail = () => {
  const { mediaType, id } = useParams()
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)
  const { data: credits, loading: creditLoading } = useFetch(`/${mediaType}/${id}/credits`)
  const trailer = data?.results?.filter((f) => f.type === "Teaser")
  return (
    <div>
      <DetailsBanner video={ data?.results[data?.results?.length-1]}
        crew={credits?.crew} />
        <Cast data={credits?.cast} loading={creditLoading}/>
        <VideosSection data={data?.results} loading={loading}/>
        <Similar mediaType={mediaType} id={id}/>
        <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Detail
