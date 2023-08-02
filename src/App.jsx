import { useEffect } from "react";
import { fetchDataFromApi } from './utils/api'
import { getApiConfiguration } from "./store/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getGenres } from "./store/homeSlice";

import Home from "./pages/home/Home";
import Explore from "./pages/explore/Explore";
import Detail from "./pages/detail/Detail";
import SearchResult from "./pages/searchResult/SearchResult";
import PageNotFound from "./pages/404/pageNotFound";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";


function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home)

  useEffect(() => {
    fetchApiConfig();
    genresCall()
  }, [])
  console.log(url)

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res)
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url))
    })
  }

  const genresCall = async () => {
    let promises = []
    let endPoints = ["tv", "movie"]
    let allGenres = {}

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))

    })

    const data = await Promise.all(promises)
    console.log(data)

    data.map(({ genres }) => {
      return genres.map((item) => {
        (allGenres[item.id] = item)
      })
    })
    dispatch(getGenres(allGenres))
    // console.log(allGenres)
  }


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Detail />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
