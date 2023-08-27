import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";

const MovieProvider = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);
    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Movie Available On</div>
                {!loading ? (
                    <div className="listItems">
                        {
                            data?.map((item)=>{
                                let imgUrl=url.profile+item.logo_path 
                                return(
                                    <div className="listItem" key={item.id}>
                                        <div className="profileImg">
                                            <Img src={imgUrl}/>
                                        </div>
                                        <div className="name">{item.provider_name}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default MovieProvider;