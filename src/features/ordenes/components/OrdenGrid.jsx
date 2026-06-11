import OrdenCard from "./OrdenCard";

const OrdenGrid = ({ ordenes }) => {
  return (
    <section className="orden-grid">
      {ordenes.map((orden) => (
        <OrdenCard key={orden._id} orden={orden} />
      ))}
    </section>
  );
};

export default OrdenGrid;
