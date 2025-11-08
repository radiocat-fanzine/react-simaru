import { Link } from "react-router-dom";
import StateComponent from "../ColorPick/StateComponent";
import './Item.css'

function Item ( {id, title, imgURL, price}) {

    const correctedImgURL = '/' + imgURL;

    return (
        <div className="item-card">
            <h2 className="item-card-title"> {title} </h2>
            <img 
            className="item-card-img"
            height= "300"
            src= {correctedImgURL}
            alt= {title}
            />

            <h3 className="item-card-price">Price: € {price} </h3>
            <StateComponent/>
            <div style={{ textAlign: "center"}}>
                <Link to= {`/detail/${id}`}>
                    <button>See more</button>
                </Link>
            </div>
        </div>
    )
}

export default Item;
