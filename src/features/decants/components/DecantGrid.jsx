import DecantCard from "./DecantCard";

const DecantGrid = ({ decants }) => {
  return (
    <section className="perfume-grid">
      {decants.map((decant) => (
        <DecantCard
          key={decant._id}
          decant={decant}
        />
      ))}
    </section>
  );
};

export default DecantGrid;