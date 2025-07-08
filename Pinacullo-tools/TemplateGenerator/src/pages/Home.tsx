import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="container" style={{textAlign:"center"}}>
      <h1 style={{fontSize:"2rem", marginBottom:"2rem"}}>Gerador de Templates</h1>

      <div style={{display:"flex", gap:"1rem", justifyContent:"center"}}>
        <Link to="/CreateTemplate" className="btn">Novo template</Link>
      </div>
    </section>
  );
}
