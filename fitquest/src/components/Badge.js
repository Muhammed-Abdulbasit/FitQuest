import './Badge.css'

const Achievement = ({name, description}) => {
    return (
      <div className="hexagon">
      <h3>{name}</h3>
      <p>{description}</p>
      </div>
    );
  }
  
  export default Achievement