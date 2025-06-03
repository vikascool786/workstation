import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import './card.css'; // Assuming you have a CSS file for styling
export type CardType = {
  id: string;
  title: string;
};

const Card: FC<CardType> = ({ id, title }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: id
  });

  const style = {
    margin: "10px",
    opacity: 1,
    color: "#333",
    background: "white",
    padding: "10px",
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div id={id} className="card__wrapper">
        <div className="card__custom">
          <div className="card__title">{title}</div>
          <div className="card__action">{'..'}</div>
        </div>
        <div className="card__desc">{'description'}</div>
         <div className="card__footer">
          <div className="card__title">#001</div>
          <div className="card__action-footer">{'V'}</div>
        </div>
      </div>
    </div>
    //  <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
    //   <div id={id}>
    //     <div className="card  p-0">
    //       <div className="card-body p-0">
    //         <h5 className="card-title p-0">{title}</h5>
    //         <p className="card-text  p-0">Some quick example text...</p>
    //         {/* <a href="#" className="btn btn-primary ">Go somewhere</a> */}
    //       </div>
    //     </div>  
    //   </div>
    // </div>
  );
};

export default Card;
