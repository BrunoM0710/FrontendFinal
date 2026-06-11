import "./PerfumeGrid.css";
import PerfumeCard from "./PerfumeCard";

const PerfumeGrid = ({ perfumes }) => {
  return (
    <section className="perfume-grid">
      {perfumes.map((perfume) => (
        <PerfumeCard
          key={perfume._id}
          perfume={perfume}
        />
      ))}
    </section>
  );
};

export default PerfumeGrid;